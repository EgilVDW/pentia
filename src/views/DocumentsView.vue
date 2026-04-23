<script setup>
import { ref, computed } from "vue";
import Icon from "@/components/Icon.vue";
import SearchInput from "@/components/SearchInput.vue";
import SelectInput from "@/components/SelectInput.vue";
import DocumentFile from "@/components/DocumentFile.vue";

// Dummy data
const documents = ref([
  { id: 1, name: "Plantegning.pdf", category: "Tegninger", date: new Date(), fileUrl: "#" },
  { id: 2, name: "Købsaftale.pdf", category: "Kontrakt", date: new Date(), fileUrl: "#" },
  { id: 3, name: "Leveranceplan.pdf", category: "Tidsplan", date: new Date(), fileUrl: "#" },
  { id: 4, name: "BBR-oplysninger.pdf", category: "Kontrakt", date: new Date(), fileUrl: "#" },
  { id: 5, name: "Guide til aflevering.pdf", category: "Andet", date: new Date(), fileUrl: "#" }
]);

const searchQuery = ref("");
const selectedCategory = ref("");
const selectedSort = ref("seneste");

const categories = [
  { label: "Alle kategorier", value: "" },
  { label: "Tegninger", value: "Tegninger" },
  { label: "Kontrakt", value: "Kontrakt" },
  { label: "Tidsplan", value: "Tidsplan" }
];

const sortOptions = [
  { label: "Seneste", value: "seneste" },
  { label: "Ældste", value: "aeldste" },
  { label: "Navn (A-Å)", value: "navn" }
];

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

const handleSearch = (val) => {
  searchQuery.value = val;
};

const handleCategorySelect = (val) => {
  selectedCategory.value = val;
};

const handleSortSelect = (val) => {
  selectedSort.value = val;
};
</script>

<template>
  <main class="document-view">
    <header class="document-view__header">
      <h1 class="document-view__title">Dokumenter</h1>

      <div class="document-view__filters">
        <SelectInput label="Alle kategorier" :options="categories" @select="handleCategorySelect"
          class="document-view__filter-item">
          <template #icon>
            <Icon name="Kategorier" />
          </template>
        </SelectInput>

        <SelectInput label="Seneste" :options="sortOptions" @select="handleSortSelect"
          class="document-view__filter-item">
          <template #icon>
            <Icon name="Filter" />
          </template>
        </SelectInput>
      </div>

      <div class="document-view__search">
        <SearchInput @search-change="handleSearch" />
      </div>
    </header>

    <content class="document-view__content">
      <div class="document-view__list">
        <DocumentFile v-for="doc in filteredDocuments" :key="doc.id" :doc="doc" class="document-view__item" />
      </div>

      <p v-if="filteredDocuments.length === 0" class="document-view__empty">
        Ingen dokumenter fundet.
      </p>
    </content>
  </main>
</template>

<style lang="scss" scoped>
.document-view {

  &__header {
    margin: 0 auto 1rem;
  }

  &__title {
    font-size: $font-size-headline-1;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  &__filters {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 0.5rem;
  }

  &__filter-item {
    flex: 1;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__empty {
    text-align: center;
    color: $color-foreground;
    margin-top: 2rem;
    font-style: normal;
  }
}
</style>
