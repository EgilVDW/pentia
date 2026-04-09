import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import FrontpageView from "@/views/FrontpageView.vue";


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
      path: "/frontpage",
      name: "frontpage",
      component: FrontpageView
    }
  ]
});

export default router;
