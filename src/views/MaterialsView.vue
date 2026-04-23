<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { computed, ref } from "vue";

const getImageUrl = (name) => {
  return name
    ? `/images/images_bygherre/Materialevalg_billeder/${name}`
    : null
}

const cards = ref([
  {
    id: 1,
    title: "Køkken",
    description: "Valgt: HTH Nordic",
    image: "Rectangle 44.png",
    alt: "Billede af et køkken",
    selected: false
  },
  {
    id: 2,
    title: "Bad",
    description: "Valgt: Bad & fliser",
    image: "Badeværelse.png",
    selected: false
  },
  {
    id: 3,
    title: "Gulve",
    description: "Valgt: Eg planke",
    image: "Rectangle 44_2.png",
    selected: false
  },
  {
    id: 4,
    title: "Fliser",
    description: "Afventer valg",
    image: "Rectangle 44_3.png",
    selected: false
  },
  {
    id: 5,
    title: "Tag",
    description: "Valgt: Betontagsten",
    image: "Rectangle 44_4.png",
    selected: false

  },
  {
    id: 6,
    title: "Døre",
    description: "Valgt: Hvid glat",
    image: null,
    selected: false
  },
  {
    id: 7,
    title: "Vindue",
    description: "Valgt: Topstyrede",
    image: null,
    selected: false
  }
])

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
  <div id="progress-bar">
    <MaterialsProgressBar
      :completedSteps="completedSteps"
      :totalSteps="totalSteps"
    />
  </div>

  <section id="materials">
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
#materials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 22px 27px;
}

.materials__stack {
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}
</style>