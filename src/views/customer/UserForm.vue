<template>
  <CustomerLayout>
    <div class="container mt-5">
      <div class="card p-4">
        <h2 class="mb-4">Kullanıcı Bilgileri</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group mb-3">
            <label for="name">İsim:</label>
            <input type="text" id="name" v-model="name" class="form-control" required />
          </div>
          <div class="form-group mb-3">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Devam Et</button>
        </form>
      </div>
    </div>
  </CustomerLayout>
</template>

<script>
import { createUser } from "../../services/UserService";
import { useToast } from "vue-toastification";
import CustomerLayout from "./CustomerLayout.vue";

export default {
  name: "UserForm",
  components: {
    CustomerLayout,
  },
  data() {
    return {
      name: "",
      email: "",
      toast: useToast(),
    };
  },
  methods: {
    async submitForm() {
      try {
        const userDto = {
          name: this.name,
          email: this.email,
        };
        const userResponse = await createUser(userDto);
        const userId = userResponse.user_id;
        this.toast.success("Kullanıcı başarıyla oluşturuldu!");

        // write user_id to localStorage
        localStorage.setItem('userId', userId);

        // Route to reservation form
        this.$router.push({ name: 'ReservationForm' });
      } catch (error) {
        console.error("Error creating user:", error);
        this.toast.error("Kullanıcı oluşturulurken hata oluştu.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.card {
  background-color: white;
  border-radius: 10px;
}

.card h2 {
  text-align: center;
  color: #343a40;
}

.card .form-group label {
  font-weight: bold;
  color: #495057;
}

.card .form-control {
  border-radius: 5px;
}

.card .btn {
  background-color: #007bff;
  border: none;
  font-weight: bold;
}
</style>
