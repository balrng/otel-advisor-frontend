// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import AdminHome from '../views/agency/AdminHome.vue';
import ExperienceComponent from "../views/agency/ExperienceComponent.vue";
import HotelComponent from "../views/agency/HotelComponent.vue";
import HotelExperienceComponent from "../views/agency/HotelExperienceComponent.vue";
import ReservationComponent from "../views/agency/ReservationComponent.vue";
import UserComponent from "../views/agency/UserComponent.vue";
import UserPreferenceComponent from "../views/agency/UserPreferenceComponent.vue";
import UserRecommendationComponent from "../views/agency/UserRecommendationComponent.vue";
import CustomerHome from "@/views/customer/CustomerHome.vue";
import UserForm from "@/views/customer/UserForm.vue";
import ReservationForm from "@/views/customer/ReservationForm.vue";
import ExperienceForm from "@/views/customer/ExperienceForm.vue";
import ExperienceRating from "@/views/customer/ExperienceRating.vue"; 


// Import components

const routes = [
  {
    path: "/admin",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/admin/experience",
    name: "ExperienceComponent",
    component: ExperienceComponent,
  },
  {
    path: "/admin/hotel",
    name: "HotelComponent",
    component: HotelComponent,
  },
  {
    path: "/admin/HotelExperience",
    name: "HotelExperienceComponent",
    component: HotelExperienceComponent,
  },
  {
    path: "/admin/Reservation",
    name: "ReservationComponent",
    component: ReservationComponent,
  },
  {
    path: "/admin/User",
    name: "UserComponent",
    component: UserComponent,
  },
  {
    path: "/admin/UserPreference",
    name: "UserPreferenceComponent",
    component: UserPreferenceComponent,
  },
  {
    path: "/admin/UserRecommendation",
    name: "UserRecommendationComponent",
    component: UserRecommendationComponent,
  },
  {
    path: "/customer",
    name: "CustomerHome",
    component: CustomerHome,
  },
  {
    path: "/customer/user-form",
    name: "UserForm",
    component: UserForm,
  },
  {
    path: "/customer/reservation-form",
    name: "ReservationForm",
    component: ReservationForm,
  },
  {
    path: "/customer/experience-form",
    name: "ExperienceForm",
    component: ExperienceForm,
  },
  {
    path: "/customer/experience-rating",
    name: "ExperienceRating",
    component: ExperienceRating,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
