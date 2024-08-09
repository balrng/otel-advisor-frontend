<template>
  <CustomerLayout>
    <div class="container mt-5">
      <div class="card shadow-sm p-4">
        <h2>Otelde Olmasını İstediğin 3 Deneyimi Seç</h2>
        <div class="row">
          <div class="col-md-6" v-for="experience in experiences" :key="experience.id">
            <label class="control control--checkbox">
              {{ experience.name }}
              <input 
                type="checkbox" 
                :value="experience.id" 
                :id="'experience-' + experience.id"
                v-model="experience.checked"
                @change="updateSelectedExperiences"
                :disabled="maxSelected && !experience.checked" 
              />
              <div class="control__indicator"></div>
            </label>
          </div>
        </div>
        <div v-if="showError" class="text-danger mt-2">
          En fazla 3 deneyim seçebilirsiniz.
        </div>
        <button 
          @click="nextStep" 
          class="btn btn-primary w-100 mt-4" 
          :disabled="selectedExperiences.length !== 3"
        >
          Devam Et
        </button>
      </div>
    
      <div v-if="step === 2" class="card shadow-sm p-4 mt-4">
        <h2>Seçilen Deneyimleri Puanlayın</h2>
        <div v-for="(experience, index) in selectedExperiences" :key="experience.id" class="form-group mb-3">
          <label :for="'rating-' + experience.id">Puanlayın (1-5): {{ experience.name }}</label>
          <select :id="'rating-' + experience.id"   v-model="selectedValues[index]" @change="handleChange(index)"  class="form-control" required>
            <option value="" disabled selected>Seçiniz</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <button 
          @click="submitRatings(selectedValues)" 
          class="btn btn-primary w-100 mt-4"
        >
          Gönder
        </button>
      </div>
    </div>
  </CustomerLayout>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import CustomerLayout from "./CustomerLayout.vue";

export default {
  name: "ExperienceForm",
  components: {
    CustomerLayout,
  },
  data() {
    return {
      experiences: [],
      showError: false,
      step: 1,
      ratings: {},
      userId: null,
      toast: useToast(),
      selectedValues: [],
    };
  },
  computed: {
    selectedExperiences() {
      return this.experiences.filter(exp => exp.checked).map(exp => ({
        id: exp.id,
        name: exp.name,
      }));
    },
    maxSelected() {
      return this.selectedExperiences.length >= 3;
    }
  },
  async created() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.toast.error("Kullanıcı bilgileri bulunamadı.");
      this.$router.push({ name: 'UserForm' });
      return;
    }
    await this.fetchExperiences();
  },
  methods: {
    async fetchExperiences() {
      try {
        const response = await axios.get("https://localhost:7018/api/experience");
        this.experiences = response.data.map(experience => ({
          ...experience,
          checked: false
        }));
      } catch (error) {
        console.error("Error fetching experiences:", error);
        this.toast.error("Deneyimler alınırken hata oluştu.");
      }
    },
    updateSelectedExperiences() {
      if (this.selectedExperiences.length > 3) {
        this.toast.error("En fazla 3 deneyim seçebilirsiniz.");

        const lastCheckedExperience = this.experiences.findLast(exp => exp.checked);
        lastCheckedExperience.checked = false;
      }

      this.showError = this.selectedExperiences.length > 3;
    },
    nextStep() {
      if (this.selectedExperiences.length === 3) {
        this.step = 2;
      } else {
        this.toast.error("Lütfen 3 deneyim seçin.");
      }
    },
    async submitRatings(selectedValues) {
      console.log( 'selectedValues', selectedValues)
      try {
        const reservationData = JSON.parse(localStorage.getItem('reservationData'));
       
        
        if (!reservationData) {
          this.toast.error("Rezervasyon bilgileri bulunamadı.");
          return;
        }

        const reservationDto = {
          user_id: this.userId,
          region: reservationData.region,
          budget: reservationData.budget,
          trip_start: new Date(reservationData.trip_start).toISOString(),
          trip_end: new Date(reservationData.trip_end).toISOString(),
          stay_duration: reservationData.stay_duration,
          exp_1: this.selectedExperiences[0].name,
          exp_1_rating: this.selectedValues[0] || 0,
          exp_2: this.selectedExperiences[1].name,
          exp_2_rating: this.selectedValues[1] || 0,
          exp_3: this.selectedExperiences[2].name,
          exp_3_rating: this.selectedValues[2] || 0,
        };
        //Change from  -> this.ratings[this.selectedExperiences[0].id] || 0 change to -> this.selectedValues[1] || 0,
        

        console.log('Reservation DTO:', reservationDto); 

        await axios.post('https://localhost:7018/api/reservation', reservationDto);

        this.toast.success("Rezervasyon ve deneyim bilgileri başarıyla kaydedildi!");
        this.$router.push({ name: 'UserForm' });
      } catch (error) {
        console.error("Error saving reservation and experience data:", error);
        this.toast.error("Rezervasyon ve deneyim bilgileri kaydedilirken hata oluştu.");
      }
    },
  
     handleChange(index) { 
       console.log('Selected value for index', index, 'is', this.selectedValues[index] ,  this.selectedValues);
     }
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card {
  background-color: white;
  border-radius: 10px;
}

.card h2 {
  text-align: center;
  color: #343a40;
}

.control-group {
  display: inline-block;
  vertical-align: top;
  background: #FFFFFF;
  text-align: left;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  margin: 10px;
}

.control {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
}

input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.control__indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background: #E6E6E6;
}

.control:hover input ~ .control__indicator,
.control input:focus ~ .control__indicator {
  background: #CCCCCC;
}

.control input:checked ~ .control__indicator {
  background: #2AA1C0;
}

.control:hover input:not([disabled]):checked ~ .control__indicator,
.control input:checked:focus ~ .control__indicator {
  background: #0E647D;
}

.control input:disabled ~ .control__indicator {
  background: #E6E6E6;
  opacity: 0.6;
  pointer-events: none;
}

.control__indicator:after {
  content: '';
  position: absolute;
  display: none;
}

.control input:checked ~ .control__indicator:after {
  display: block;
}

.control--checkbox .control__indicator:after {
  left: 8px;
  top: 4px;
  width: 3px;
  height: 8px;
  border: solid #FFFFFF;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.control--checkbox input:disabled ~ .control__indicator:after {
  border-color: #7B7B7B;
}

.control--radio .control__indicator:after {
  left: 7px;
  top: 7px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: #FFFFFF;
}

.control--radio input:disabled ~ .control__indicator:after {
  background: #7B7B7B;
}

.select {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
  width: 100%;
}

select {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 10px 15px;
  outline: 0;
  border: 0;
  border-radius: 0;
  background: #E6E6E6;
  color: #7B7B7B;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select::-ms-expand {
  display: none;
}

select:hover,
select:focus {
  color: #000000;
  background: #CCCCCC;
}

select:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.select__arrow {
  position: absolute;
  top: 16px;
  right: 15px;
  width: 0;
  height: 0;
  pointer-events: none;
  border-style: solid;
  border-width: 8px 5px 0 5px;
  border-color: #7B7B7B transparent transparent transparent;
}

.select select:hover ~ .select__arrow,
.select select:focus ~ .select__arrow {
  border-top-color: #000000;
}

.select select:disabled ~ .select__arrow {
  border-top-color: #CCCCCC;
}
</style>
