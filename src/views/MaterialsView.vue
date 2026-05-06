<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { computed, onMounted, ref } from "vue";

// const storage = getStorage()

const getImageUrl = (name) => {
  return name
    ? `/images/images_bygherre/Materialevalg_billeder/${name}`
    : null
}

// const getImageUrl = async (fileName) => {
//   if (!fileName) return null

//   try {
//     const fileRef = storageRef(storage, `materials/${fileName}`)
//     return await getDownloadURL(fileRef)
//   } catch (error) {
//     console.error("Error fetching image:", error)
//     return null
//   }
// }

const cards = ref([])

const fetchMaterials = async () => {
  try {
    const materialsSnapshot = await getDocs(collection(db, "materials"))

    const allCards = materialsSnapshot.docs.map(doc => {
      const data = doc.data()

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
      :description="card.selected ? 'Valg taget' : 'Afventer valg'"
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
        :description="card.selected ? 'Valg taget' : 'Afventer valg'"
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