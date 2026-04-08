import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";


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
    }
  ]
});

export default router;
