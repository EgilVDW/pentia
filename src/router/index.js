import CalendarView from "@/views/CalendarView.vue";
import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import ProfileView from "@/views/ProfileView.vue";
import DocumentsView from "@/views/DocumentsView.vue";
import ChatView from "@/views/ChatView.vue";
import StatusView from "@/views/StatusView.vue";
import { createRouter, createWebHistory } from "vue-router";

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
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView
    },
    {
      path: "/status",
      name: "status",
      component: StatusView
    }
  ]
});

export default router;
