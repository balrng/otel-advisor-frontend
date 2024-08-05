<template>
  <AdminLayout>
    <div class="container mt-5">
      <h1 class="mb-4">User Recommendation List</h1>
      <div class="card p-4 mb-4">
        <form @submit.prevent="fetchRecommendations">
          <div class="mb-3">
            <label for="identifier" class="form-label">User ID or Name:</label>
            <input type="text" v-model="identifier" id="identifier" class="form-control" placeholder="Enter User ID or Name" />
          </div>
          <button type="submit" class="btn btn-primary">Get Recommendations</button>
        </form>
      </div>
      <ul class="list-group">
        <li v-for="userRecommendation in userRecommendations" :key="userRecommendation.hotel_id" class="list-group-item">
          <strong>Location:</strong> {{ userRecommendation.location }} - 
          <strong>Name:</strong> {{ userRecommendation.name }} - 
          <strong>Match Point:</strong> {{ userRecommendation.rating.toFixed(2) }}
        </li>
      </ul>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HotelDto } from "../../models/HotelDto";
import { getRecommendedHotels } from "../../services/UserRecommendationService";
import { getUserByName } from "../../services/UserService";
import AdminLayout from './AdminLayout.vue';

@Options({
  components: {
    AdminLayout,
  },
})
export default class UserRecommendationComponent extends Vue {
  userRecommendations: HotelDto[] = [];
  identifier: string = "";

  async fetchRecommendations() {
    try {
      if (isNaN(Number(this.identifier))) {
        const user = await getUserByName(this.identifier);
        if (user) {
          this.userRecommendations = await getRecommendedHotels(user.user_id);
        } else {
          this.userRecommendations = [];
          alert("User not found");
        }
      } else {
        const user_id = Number(this.identifier);
        this.userRecommendations = await getRecommendedHotels(user_id);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Error fetching recommendations");
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card {
  border: 1px solid #e3e3e3;
  border-radius: 8px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.list-group-item {
  border: 1px solid #e3e3e3;
  margin-bottom: 10px;
  border-radius: 8px;
}
</style>
