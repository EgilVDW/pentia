<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialOptionsModal from "@/components/MaterialOptionsModal.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";

const cards = ref([])

const fetchMaterials = async () => {
  try {
    const materialsSnapshot = await getDocs(collection(db, "materials"))

    const allCards = materialsSnapshot.docs.map(doc => {
      const data = doc.data()

      console.log(data.image)

      return {
        id: doc.id,
        title: data.category || data.name || "Ukendt",
        image: data.image ?? null,
        selected: false
      }
    })

    cards.value = allCards
  } catch (error) {
    console.error("Fetching error:", error)
  }
}

onMounted(() => {
  fetchMaterials()
})

const materialCards = computed(() => cards.value)

const completedSteps = computed(() =>
  cards.value.filter(card => card.selected).length
)

const totalSteps = computed(() => cards.value.length)

const toggleCard = (id) => {
  const card = cards.value.find(c => c.id === id)
  if (card) card.selected = !card.selected
}

const modalOpen = ref(false)
const selectedMaterial = ref(null)

const openModal = (card) => {
  selectedMaterial.value = card
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedMaterial.value = null
}

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
      v-for="(card) in materialCards"
      :key="card.id"
      :title="card.title"
      :description="card.selected ? 'Valg taget' : 'Afventer valg'"
      :image="card.image || '/images/placeholders/default.png'"
      :selected="card.selected"
      @click="openModal(card)"
      @toggle="toggleCard(card.id)"
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