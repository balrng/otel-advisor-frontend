<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4">
      <h2 class="mb-4 text-center">Otelde Olmasını İstediğin 3 Deneyimi Seç</h2>
      <div v-for="experience in experiences" :key="experience.id" class="form-check">
        <input
          type="checkbox"
          :value="experience.id"
          v-model="selectedExperiences"
          class="form-check-input"
          :id="'experience-' + experience.id"
        />
        <label class="form-check-label" :for="'experience-' + experience.id">
          {{ experience.name }}
        </label>
      </div>
      <button @click="submitSelection" class="btn btn-primary w-100 mt-4">Submit</button>
    </div>
  </div>
</template>

<script>
import { getAllExperiences } from "../../services/ExperienceService"; // Import experienceService

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
.container {
  max-width: 600px;
}

.card {
  background-color: white;
  border-radius: 10px;
}

.card h2 {
  text-align: center;
  color: #343a40;
}

.card .form-check {
  margin-bottom: 10px;
}

.card .form-check-label {
  font-weight: bold;
  color: #495057;
}

.card .btn {
  background-color: #007bff;
  border: none;
  font-weight: bold;
}
</style>
