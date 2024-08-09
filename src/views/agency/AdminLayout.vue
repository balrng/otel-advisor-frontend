<!-- src/views/agency/AdminLayout.vue -->
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.png" alt="Logo" class="logo"> Admin Panel
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/experience">Experience</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/hotel">Hotel Component</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/hotelExperience">Hotel Experience</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/reservation">Reservation</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/user">User</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/userRecommendation">User Recommendation</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main class="container mt-4">
      <slot></slot> 
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminLayout',
});
</script>

<style scoped>
.container {
  padding-top: 20px;
}

.logo {
  height: 45px; 
  width: 50px;  
  margin-right: 10px; 
}

.nav-link{
  font-size: 1.2rem;
}
</style>
