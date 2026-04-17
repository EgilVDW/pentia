import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import ProfileView from "@/views/ProfileView.vue";
import DocumentsView from "@/views/DocumentsView.vue";
import ChatView from "@/views/ChatView.vue";

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
    },
    {
      path: "/documents",
      name: "documents",
      component: DocumentsView
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView
    }
  ]
});

export default router;
