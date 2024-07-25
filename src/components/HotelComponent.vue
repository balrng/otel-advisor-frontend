<template>
  <div>
    <h1>Hotel List</h1>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.name">
        {{ hotel.name }} - {{ hotel.location }} - {{ hotel.rating }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HotelDto } from "../models/HotelDto";
import { getAllHotels } from "../services/HotelService";

@Options({})
export default class HotelComponent extends Vue {
  hotels: HotelDto[] = [];

  async mounted() {
    this.hotels = await getAllHotels();
  }
}
</script>
