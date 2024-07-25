<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.email">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UserDto } from "../models/UserDto";
import { getAllUsers } from "../services/UserService";

@Options({})
export default class UserComponent extends Vue {
  users: UserDto[] = [];

  async mounted() {
    this.users = await getAllUsers();
  }
}
</script>
