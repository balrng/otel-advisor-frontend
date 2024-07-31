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
        @click="submitSelection" 
        class="btn btn-primary w-100 mt-4" 
        :disabled="selectedExperiences.length !== 3"
      >
        Submit
      </button>
    </div>
  </div>
  </CustomerLayout>
</template>


<script>
import { getAllExperiences } from "../../services/ExperienceService"; // Import experienceService
import CustomerLayout from "./CustomerLayout.vue";

export default {
  name: "ExperienceSelection",
  components: {
    CustomerLayout,
  },
  data() {
    return {
      experiences: [], // This should be fetched from the API
      showError: false,
    };
  },
  created() {
    // Fetch experiences from the API
    this.fetchExperiences();
  },
  computed: {
    selectedExperiences() { 
      return this.experiences.filter(exp => exp.checked).map(exp => exp.id);
    },
    maxSelected() {
      return this.selectedExperiences.length >= 3; 
    }
  },

  methods: {
    async fetchExperiences() {
      try {
        const experiences = await getAllExperiences();
        this.experiences = experiences.map(experience => ({
          ...experience,
          checked: false
        }));
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    },
    updateSelectedExperiences() {
      // Handle the error condition
      if (this.selectedExperiences.length > 3) {
        this.$toast.error("En fazla 3 deneyim seçebilirsiniz.");
        
        // Uncheck the last selected experience
        const lastCheckedExperience = this.experiences.findLast(exp => exp.checked);
        lastCheckedExperience.checked = false;
      }
      
      // Update the error message visibility
      this.showError = this.selectedExperiences.length > 3; 
    },

    submitSelection() {
      if (this.selectedExperiences.length === 3) {
        console.log(this.selectedExperiences);
        this.showError = false;
      }
    },
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
