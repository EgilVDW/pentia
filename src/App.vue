<script setup>
import { onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";
import { useMaterialsStore } from "@/stores/materials";
import { useDocumentCategoriesStore } from "@/stores/documentCategories";
import { useContactStore } from "@/stores/contact";
import { useUserStore } from "@/stores/user";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const materialsStore = useMaterialsStore();
const categoriesStore = useDocumentCategoriesStore();
useContactStore();

const store = useUserStore();
store.initAuth();

onMounted(() => {
  // Lytte efter om brugeren er logget ind
  authStore.initAuth();

  // Henter project inkl. subcollections
  projectStore.fetchProject();

  // Henter data
  materialsStore.fetchMaterials();
  categoriesStore.fetchCategories();
});

watch(
  () => authStore.user,
  (user) => {
    if (user?.uid) {
      authStore.startPresence(user.uid);
    }
  },
  { immediate: true }
);
</script>

<template>
  <RouterView />
</template>
