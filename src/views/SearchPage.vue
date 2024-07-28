<template>
  <div class="search-page">
    <h1>HOME</h1>
    <div class="content">
      <SearchForm />
      <ExperienceSelection />
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import ExperienceSelection from "@/components/ExperienceSelection.vue";

export default {
  name: "SearchPage",
  components: {
    SearchForm,
    ExperienceSelection,
  },
};
</script>

<style scoped>
.search-page {
  text-align: center;
}

.content {
  display: flex;
  justify-content: space-around;
}
</style>
