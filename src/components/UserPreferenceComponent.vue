<template>
  <div>
    <h1>User Preference List</h1>
    <ul>
      <li
        v-for="userPreference in userPreferences"
        :key="userPreference.user_id"
      >
        User ID: {{ userPreference.user_id }} - Experience ID:
        {{ userPreference.experience_id }} - Priority:
        {{ userPreference.priority }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UserPreferenceDto } from "../models/UserPreferenceDto";
import { getAllUserPreferences } from "../services/UserPreferenceService";

@Options({})
export default class UserPreferenceComponent extends Vue {
  userPreferences: UserPreferenceDto[] = [];

  async mounted() {
    this.userPreferences = await getAllUserPreferences();
  }
}
</script>
