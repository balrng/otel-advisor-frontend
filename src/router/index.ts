// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import ExperienceComponent from "../components/ExperienceComponent.vue";
import HotelComponent from "../components/HotelComponent.vue";
import HotelExperienceComponent from "../components/HotelExperienceComponent.vue";
import ReservationComponent from "../components/ReservationComponent.vue";
import UserComponent from "../components/UserComponent.vue";
import UserPreferenceComponent from "../components/UserPreferenceComponent.vue";
import UserRecommendationComponent from "../components/UserRecommendationComponent.vue";

// Diğer bileşenleri import edin

const routes = [
  {
    path: "/",
    name: "Home",
    component: UserRecommendationComponent,
  },
  {
    path: "/hello",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/experience",
    name: "Experience",
    component: ExperienceComponent,
  },

  {
    path: "/hotelComponent",
    name: "HotelComponent",
    component: HotelComponent,
  },

  {
    path: "/HotelExperienceComponent",
    name: "HotelExperienceComponent",
    component: HotelExperienceComponent,
  },

  {
    path: "/ReservationComponent",
    name: "ReservationComponent",
    component: ReservationComponent,
  },

  {
    path: "/UserComponent",
    name: "UserComponent",
    component: UserComponent,
  },

  {
    path: "/UserPreferenceComponent",
    name: "UserPreferenceComponent",
    component: UserPreferenceComponent,
  },

  {
    path: "/UserRecommendationComponent",
    name: "UserRecommendationComponent",
    component: UserRecommendationComponent,
  },

  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
