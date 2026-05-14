import ChatLayout from "@/layouts/ChatLayout.vue";
import DesktopLayout from "@/layouts/DesktopLayout.vue";
import ProjectLayout from "@/layouts/ProjectLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import CalendarView from "@/views/CalendarView.vue";
import ChatView from "@/views/ChatView.vue";
import DailyUpdateView from "@/views/DailyUpdate.vue";
import DocumentsView from "@/views/DocumentsView.vue";
import FrontpageView from "@/views/FrontpageView.vue";
import GalleryView from "@/views/GalleryView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MaterialsView from "@/views/MaterialsView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import ProfileView from "@/views/ProfileView.vue";
import StatusView from "@/views/StatusView.vue";
import DesktopHomeView from "@/views/desktop/HomeView.vue";
import CustomerView from "@/views/desktop/CustomerView.vue";
import UploadImagesView from "@/views/desktop/UploadImagesView.vue";
import MaterialsUploadView from "@/views/desktop/MaterialsUploadView.vue";
import SignupView from "@/views/Signup.vue";
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
      path: "/",
      component: ChatLayout,
      children: [
        {
          path: "/chat",
          name: "chat",
          component: ChatView
        }
      ]
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/desktop",
      component: DesktopLayout,
      children: [
        {
          path: "",
          name: "placeholder",
          component: DesktopHomeView
        },
        {
          path: ":projectId",
          component: ProjectLayout,
          children: [
            {
              path: "",
              name: "bygherre",
              component: CustomerView
            },
            {
              path: "3d-tegning",
              name: "3d-tegning",
              component: DesktopHomeView
            },
            {
              path: "dagsopdatering",
              name: "dagsopdatering",
              component: DesktopHomeView
            },
            {
              path: "billeder",
              name: "billeder",
              component: UploadImagesView
            },
            {
              path: "kontakt",
              name: "kontakt",
              component: DesktopHomeView
            },
            {
              path: "dokumenter",
              name: "dokumenter",
              component: DesktopHomeView
            },
            {
              path: "kalender",
              name: "kalender",
              component: DesktopHomeView
            },
            {
              path: "materialevalg",
              name: "materialevalg",
              component: MaterialsUploadView
            }
          ]
        }
      ]
    }
  ]
});

export default router;
