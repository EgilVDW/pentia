import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CalendarView from "@/views/CalendarView.vue";
import ChatView from "@/views/ChatView.vue";
import DailyUpdateView from "@/views/DailyUpdate.vue";
import DocumentsView from "@/views/DocumentsView.vue";
import GalleryView from "@/views/GalleryView.vue";
import HomeView from "@/views/HomeView.vue";
import MaterialsView from "@/views/MaterialsView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import ProfileView from "@/views/ProfileView.vue";
import StatusView from "@/views/StatusView.vue";
import FrontpageView from "@/views/FrontpageView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
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
          path: "/materials",
          name: "materials",
          component: MaterialsView
        },
        {
          path: "/status",
          name: "status",
          component: StatusView
        },
        {
          path: "/gallery",
          name: "gallery",
          component: GalleryView
        },
        {
          path: "/dailyupdate",
          name: "dailyupdate",
          component: DailyUpdateView
        }
      ]
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView
    }
  ]
});

export default router;
