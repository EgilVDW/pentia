<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialOptionsModal from "@/components/MaterialOptionsModal.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { useMaterialsStore } from "@/stores/materialsStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const store = useMaterialsStore();
const { cards, completedSteps, totalSteps } = storeToRefs(store);

onMounted(store.fetchMaterials);

// UI-only state — belongs in the view, not the store
const modalOpen = ref(false);
const selectedMaterial = ref(null);

const handleCardClick = (card) => {
  openModal(card);
  store.toggleCard(card.id);
};

const openModal = (card) => {
  selectedMaterial.value = card;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  selectedMaterial.value = null;
};
</script>

<template>
  <div class="project">
    <h1 class="project__header">Materialevalg</h1>
    <p class="project__subject">Projekt: Vinkelhus</p>
    <p class="project__address">Adresse: Holkebjergvej 76, 5260 Odense</p>
  </div>

  <div class="progress-bar">
    <MaterialsProgressBar
      :completedSteps="completedSteps"
      :totalSteps="totalSteps"
    />
  </div>

  <section class="materials">
    <MaterialCards
      v-for="(card) in cards"
      :key="card.id"
      :title="card.title"
      :description="card.selected ? 'Valg taget' : 'Afventer valg'"
      :image="card.image || '/images/placeholders/default.png'"
      :selected="card.selected"
      @toggle="handleCardClick(card)"
    />
  </section>

  <MaterialOptionsModal
    :open="modalOpen"
    :materialId="selectedMaterial?.id"
    :materialTitle="selectedMaterial?.title"
    @close="closeModal"
  />
</template>

<style lang="scss" scoped>
.project {
  &__header {
    font-size: $font-size-headline-1;
    font-weight: 700;
  }

  &__subject {
    font-size: $font-size-headline-2;
  }

  &__address {
    font-size: $font-size-headline-2;
  }
}

.materials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>