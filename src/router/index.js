import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/placeholder",
      name: "placeholder",
      component: PlaceholderView
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView
    }
  ]
});

export default router;
