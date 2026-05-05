<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";

const getImageUrl = (name) => {
  return name
    ? `/images/images_bygherre/Materialevalg_billeder/${name}`
    : null
}

const cards = ref([])

const fetchMaterials = async () => {
  try {
    const materialsSnapshot = await getDocs(collection(db, "materials"))

    const allCards = []

    for (const materialDoc of materialsSnapshot.docs) {
      const optionsRef = collection(db, "materials", materialDoc.id, "options")
      const optionsSnapshot = await getDocs(optionsRef)

      optionsSnapshot.forEach((doc) => {
        const data = doc.data()

        console.log(data)

        allCards.push({
          id: doc.id,
          title: data.category || "Ukendt",
          description: "",
          image: data.image || "Badeværelse.png",
          selected: false
        })
      })
    }

    cards.value = allCards
  } catch (error) {
    console.error("Fetching error:", error)
  }
}

onMounted(() => {
  fetchMaterials()
})

const imageCards = computed(() =>
  cards.value.filter(card => card.image)
)

const noImageCards = computed(() =>
  cards.value.filter(card => !card.image)
)

const completedSteps = computed(() =>
  cards.value.filter(card => card.selected).length
)

const totalSteps = computed(() => cards.value.length)

const toggleCard = (id) => {
  const card = cards.value.find(c => c.id === id)
  if (card) card.selected = !card.selected
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
    <!-- Normal grid cards -->
    <MaterialCards
      v-for="(card) in imageCards"
      :key="card.id"
      :title="card.title"
      :description="card.description"
      :image="getImageUrl(card.image)"
      :selected="card.selected"
      @toggle="toggleCard(card.id)"
    />

    <!-- Stacked small cards -->
    <div class="materials__stack">
      <MaterialCards
        v-for="(card) in noImageCards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :image="getImageUrl(card.image)"
        :selected="card.selected"
        @toggle="toggleCard(card.id)"
      />
    </div>
  </section>
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

  &__stack {
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  }
}
</style>