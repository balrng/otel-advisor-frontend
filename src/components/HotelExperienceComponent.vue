<template>
  <div>
    <h1>Hotel Experience List</h1>
    <ul>
      <li
        v-for="hotelExperience in hotelExperiences"
        :key="hotelExperience.hotel_id"
      >
        Hotel ID: {{ hotelExperience.hotel_id }} - Experience ID:
        {{ hotelExperience.experience_id }} - Rating:
        {{ hotelExperience.rating }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HotelExperienceDto } from "../models/HotelExperienceDto";
import { getAllHotelExperiences } from "../services/HotelExperienceService";

@Options({})
export default class HotelExperienceComponent extends Vue {
  hotelExperiences: HotelExperienceDto[] = [];

  async mounted() {
    this.hotelExperiences = await getAllHotelExperiences();
  }
}
</script>
