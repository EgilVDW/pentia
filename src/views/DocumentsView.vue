<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";

import Icon from "@/components/Icon.vue";
import SearchInput from "@/components/SearchInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import DocumentFile from "@/components/DocumentFile.vue";

const route = useRoute();
const documents = ref([]);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const selectedSort = ref("seneste");

const categories = [
  { label: "Alle kategorier", value: "" },
  { label: "Tegning", value: "tegning" },
  { label: "Kontrakt", value: "kontrakt" },
  { label: "Tidsplan", value: "tidsplan" },
  { label: "Andet", value: "andet" }
];

const sortOptions = [
  { label: "Seneste", value: "seneste" },
  { label: "Ældste", value: "aeldste" },
  { label: "Navn (A-Å)", value: "navn" }
];

const fetchDocuments = async (projectId) => {
  if (!projectId || projectId === "id") {
    return;
  }

  isLoading.value = true;
  try {
    const docsRef = collection(db, "projects", projectId, "documents");
    const querySnapshot = await getDocs(docsRef);

    const docsArray = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();


        const rawName = data.name || "Navn mangler";
        const cleanName = decodeURIComponent(rawName.split("/").pop().split("?")[0]);

        let categoryLabel = "Andet";
        if (data.categoryId) {

          try {

            const categorySnap = await getDoc(data.categoryId);

            if (categorySnap.exists()) {
              categoryLabel = categorySnap.data().label;
            } else {
              console.warn("Kategori-dokumentet findes ikke i Firestore!");
            }
          } catch (err) {
            console.error("Fejl ved opslag af kategori:", err);
          }
        }

        return {
          id: docSnapshot.id,
          name: cleanName,
          category: categoryLabel,
          date: data.createdAt?.toDate() || new Date(),
          fileUrl: data.fileUrl || "#"
        };
      })
    );

    documents.value = docsArray;
    console.log("Hentede dokumenter med labels:", documents.value);
  } catch (error) {
    console.error("Fejl ved hentning af Firebase data:", error);
  } finally {
    isLoading.value = false;
  }
};


onMounted(() => {
  const projectId = route.params.id;
  fetchDocuments(projectId);
});


const filteredDocuments = computed(() => {
  return documents.value
    .filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesCategory = selectedCategory.value === "" || doc.category === selectedCategory.value;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (selectedSort.value === "navn") return a.name.localeCompare(b.name);
      if (selectedSort.value === "seneste") return b.date - a.date;
      return a.date - b.date;
    });
});

const handleSearch = (val) => { searchQuery.value = val; };
const handleCategorySelect = (val) => { selectedCategory.value = val; };
const handleSortSelect = (val) => { selectedSort.value = val; };
</script>

<template>
  <div class="document-view">
    <header class="document-view__header">
      <h1 class="document-view__title">Dokumenter</h1>

      <div class="document-view__filters">
        <SelectInput label="Alle kategorier" :options="categories" class="document-view__filter-item"
          @select="handleCategorySelect">
          <template #icon>
            <Icon name="Kategorier" />
          </template>
        </SelectInput>

        <SelectInput label="Seneste" :options="sortOptions" class="document-view__filter-item"
          @select="handleSortSelect">
          <template #icon>
            <Icon name="Filter" />
          </template>
        </SelectInput>
      </div>

      <div class="document-view__search">
        <SearchInput @search-change="handleSearch" />
      </div>
    </header>

    <main class="document-view__content">
      <div v-if="isLoading" class="document-view__loader">
        Henter dokumenter...
      </div>

      <template v-else>
        <div v-if="filteredDocuments.length" class="document-view__list">
          <DocumentFile v-for="doc in filteredDocuments" :key="doc.id" :doc="doc" class="document-view__item" />
        </div>

        <p v-else class="document-view__empty">
          Ingen dokumenter fundet.
        </p>
      </template>
    </main>
  </div>
</template>

<style lang="scss">
.document-view {
  min-height: 100vh;
  padding: 2rem 1rem;
  background-color: $color-secondary;

  &__header {
    max-width: 600px;
    margin: 0 auto 1rem;
  }

  &__title {
    font-size: $font-size-headline-1;
    font-weight: 700;
    margin-bottom: 1rem;
    color: $color-foreground;
  }

  &__filters {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 1rem;
  }

  &__filter-item {
    flex: 1;
    width: auto;
  }

  &__search {
    .search-bar__input {
      margin-top: -8px;
    }

    .search-bar__icon-container {
      top: 30%;
      transform: translateY(-50%);
    }
  }

  &__content {
    max-width: 600px;
    margin: 0 auto;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__empty,
  &__loader {
    text-align: center;
    color: $color-foreground;
    margin-top: 2rem;
  }
}
</style>