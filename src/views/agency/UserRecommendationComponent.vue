<template>
  <div>
    <h1>User Recommendation List</h1>
    <ul>
      <li
        v-for="userRecommendation in userRecommendations"
        :key="userRecommendation.user_id"
      >
        Location: {{ userRecommendation.location }} - Name:
        {{ userRecommendation.name }} - Rating: {{ userRecommendation.rating }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HotelDto } from "../../models/HotelDto";
import { getRecommendedHotels } from "../../services/UserRecommendationService";

@Options({})
export default class UserRecommendationComponent extends Vue {
  userRecommendations: HotelDto[] = [];
  user_id: number = 1;

  async mounted() {
    this.userRecommendations = await getRecommendedHotels(this.user_id);
  }
}
</script>
