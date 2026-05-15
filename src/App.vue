<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";
import { useMaterialsStore } from "@/stores/materials";
import { useDocumentCategoriesStore } from "@/stores/documentCategories";
import { useContactStore } from "@/stores/contact";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const materialsStore = useMaterialsStore();
const categoriesStore = useDocumentCategoriesStore();
const contactStore = useContactStore();

onMounted(() => {
  // Lytte efter om brugeren er logget ind
  authStore.initAuth();

  // Henter project inkl. subcollections
  projectStore.fetchProject();

  // Henter data
  materialsStore.fetchMaterials();
  categoriesStore.fetchCategories();
});
</script>

<template>
  <RouterView />
</template>
