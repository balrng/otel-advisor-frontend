<template>
  <div class="search-form">
    <h2>EN UYGUN OTELİ BUL</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">İsminizi Girin:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email Adresinizi Girin:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="location">Gitmek İstediğiniz Yeri Yazın:</label>
        <input type="text" id="location" v-model="location" required />
      </div>
      <div>
        <label for="budget">Bütçenizi Girin:</label>
        <input type="number" id="budget" v-model="budget" required />
      </div>
      <div>
        <label for="dateRange">Tarih Aralığını Girin:</label>
        <input type="date" id="checkInDate" v-model="checkInDate" required />
        <input type="date" id="checkOutDate" v-model="checkOutDate" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { createUser } from "../services/UserService";
import { createReservation } from "../services/ReservationService";
import { UserDto } from "../models/UserDto";
import { ReservationDto } from "../models/ReservationDto";

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
    };
  },
  methods: {
    async submitForm() {
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
        } else {
          console.error(
            "User ID is not available, cannot proceed with reservation creation.",
          );
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
      }
    },
  },
};
</script>

<style scoped>
.search-form {
  border: 1px solid black;
  padding: 20px;
  margin-right: 20px;
}
</style>
