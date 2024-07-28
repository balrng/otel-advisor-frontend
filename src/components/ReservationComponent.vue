<template>
  <div>
    <h1>Reservation List</h1>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.user_id">
        User ID: {{ reservation.user_id }} - Check-in:
        {{ reservation.check_in_date }} - Check-out:
        {{ reservation.check_out_date }} - Budget: {{ reservation.budget }} -
        Region: {{ reservation.region }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ReservationDto } from "../models/ReservationDto";
import { getAllReservations } from "../services/ReservationService";

@Options({})
export default class ReservationComponent extends Vue {
  reservations: ReservationDto[] = [];

  async mounted() {
    this.reservations = await getAllReservations();
  }
}
</script>
