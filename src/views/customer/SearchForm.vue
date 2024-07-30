<template>
  <div class="container">
    <div class="search-form card shadow-sm p-4 mt-5">
      <h2 class="mb-4">EN UYGUN OTELİ BUL</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group mb-3">
          <label for="name">İsminizi Girin:</label>
          <input type="text" id="name" v-model="name" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label for="email">Email Adresinizi Girin:</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label for="location">Gitmek İstediğiniz Yeri Seçin:</label>
          <select id="location" v-model="location" class="form-control" required>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="budget">Bütçenizi Girin:</label>
          <input type="number" id="budget" v-model="budget" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label for="dateRange">Tarih Aralığını Girin:</label>
          <div class="d-flex">
            <input type="date" id="checkInDate" v-model="checkInDate" class="form-control me-2" :min="minDate" @change="validateDates" required />
            <input type="date" id="checkOutDate" v-model="checkOutDate" class="form-control" :min="checkInDate || minDate" @change="validateDates" required />
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100">İleri</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { createUser } from "../../services/UserService";
import { createReservation } from "../../services/ReservationService";
import { UserDto } from "../../models/UserDto";
import { ReservationDto } from "../../models/ReservationDto";
import { useToast } from "vue-toastification";

export default {
  name: "SearchForm",
  data() {
    return {
      name: "",
      email: "",
      location: "",
      budget: null,
      checkInDate: "",
      checkOutDate: "",
      userId: null,
      locations: [],
      toast: useToast()
    };
  },
  computed: {
    minDate() {
      return new Date().toISOString().split("T")[0];
    }
  },
  async created() {
    await this.fetchLocations();
  },
  methods: {
    async fetchLocations() {
      try {
        const response = await axios.get("https://localhost:7018/api/hotel/locations");
        this.locations = response.data;
      } catch (error) {
        console.error("Error fetching locations:", error);
        this.toast.error("Lokasyonları alırken hata oluştu.");
      }
    },
    validateDates() {
      const today = new Date().toISOString().split("T")[0];
      if (this.checkInDate && this.checkInDate < today) {
        this.toast.error("Giriş tarihi bugünden önce olamaz.");
        this.checkInDate = "";
      } 
      if (this.checkOutDate && this.checkOutDate < today) {
        this.toast.error("Çıkış tarihi bugünden önce olamaz.");
        this.checkOutDate = "";
      } 
      if (this.checkInDate && this.checkOutDate && this.checkInDate > this.checkOutDate) {
        this.toast.error("Çıkış tarihi giriş tarihinden önce olamaz.");
        this.checkOutDate = "";
      }
    },
    async submitForm() {
      if (!this.checkInDate || !this.checkOutDate) {
        return;
      }

      try {
        // Step 1: Create or retrieve the user
        const userDto = new UserDto(this.name, this.email);
        const userResponse = await createUser(userDto);
        this.userId = userResponse.user_id;

        // Kullanıcı oluşturma işleminin başarılı olduğunu logla
        console.log("User created with ID:", this.userId);

        // Step 2: Create the reservation with the retrieved user_id
        if (this.userId) {
          const reservationDto = new ReservationDto(
            this.userId,
            new Date(this.checkInDate).toISOString(), // Tarih formatı ISO 8601 olmalı
            new Date(this.checkOutDate).toISOString(), // Tarih formatı ISO 8601 olmalı
            this.budget,
            this.location,
          );

          const reservationResponse = await createReservation(reservationDto);
          console.log("Reservation created successfully:", reservationResponse);
          this.toast.success("Bilgileriniz başarıyla güncellendi!");

          // Navigate to another page
          this.$router.push({ name: 'ExperienceSelection' });

        } else {
          console.error(
            "User ID is not available, cannot proceed with reservation creation.",
          );
          this.toast.error("Kullanıcı ID mevcut değil, rezervasyon oluşturulamıyor.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Error config:", error.config);
        this.toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.search-form {
  background-color: white;
  border-radius: 10px;
}

.search-form h2 {
  text-align: center;
  color: #343a40;
}

.search-form .form-group label {
  font-weight: bold;
  color: #495057;
}

.search-form .form-control {
  border-radius: 5px;
}

.search-form .btn {
  background-color: #007bff;
  border: none;
  font-weight: bold;
}
</style>
