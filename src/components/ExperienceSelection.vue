<template>
  <div class="experience-selection">
    <h2>Otelde Olmasını İstediğin 3 Deneyimi Seç</h2>
    <div v-for="experience in experiences" :key="experience.id">
      <label>
        <input
          type="checkbox"
          :value="experience.id"
          v-model="selectedExperiences"
        />
        {{ experience.name }}
      </label>
    </div>
    <button @click="submitSelection">Submit</button>
  </div>
</template>

<script>
import { getAllExperiences } from "../services/ExperienceService"; // Import experienceService

export default {
  name: "ExperienceSelection",
  data() {
    return {
      experiences: [], // This should be fetched from the API
      selectedExperiences: [],
    };
  },
  created() {
    // Fetch experiences from the API
    this.fetchExperiences();
  },
  methods: {
    async fetchExperiences() {
      try {
        const experiences = await getAllExperiences(); // experienceService metodunu kullanarak deneyimleri al
        console.log(experiences);
        this.experiences = experiences;
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    },
    submitSelection() {
      // Handle selected experiences
      console.log(this.selectedExperiences);
    },
  },
};
</script>

<style scoped>
.experience-selection {
  border: 1px solid black;
  padding: 20px;
}
</style>
