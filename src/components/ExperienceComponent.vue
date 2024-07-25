<template>
  <div>
    <h1>Experience List</h1>
    <ul>
      <li v-for="experience in experiences" :key="experience.name">
        {{ experience.name }} - {{ experience.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ExperienceDto } from "../models/ExperienceDto";
import { getAllExperiences } from "../services/ExperienceService";

@Options({})
export default class ExperienceComponent extends Vue {
  experiences: ExperienceDto[] = [];

  async mounted() {
    this.experiences = await getAllExperiences();
  }
}
</script>
