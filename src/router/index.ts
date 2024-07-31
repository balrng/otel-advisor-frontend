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
import SearchPage from "@/views/customer/SearchForm.vue";
import ExperienceSelection from "@/views/customer/ExperienceSelection.vue";

// Diğer bileşenleri import edin

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
    path: "/search-page",
    name: "SearchPage",
    component: SearchPage,
  },

  {
    path: "/experience-selection",
    name: "ExperienceSelection",
    component: ExperienceSelection,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
