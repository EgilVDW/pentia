<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { computed } from "vue";

const imageCards = computed(() =>
  cards.filter(card => card.image)
)

const noImageCards = computed(() =>
  cards.filter(card => !card.image)
)

const cards = [
  {
    title: "Bad",
    description: "Valgt: Bad & fliser",
    image: "images/images_bygherre/materialevalg_billeder/Badeværelse.png",
    alt: "Picture of a bathroom"
  },
  {
    title: "Køkken",
    description: "Vælg køkken",
    image: "..."
  },
  {
    title: "Toilet",
    description: "Vælg køkken",
    image: "..."
  },
  {
    title: "Køkken",
    description: "Vælg køkken",
    image: "..."
  },
  {
    title: "Køkken",
    description: "Vælg køkken",
    image: null
  },
  {
    title: "Bad",
    description: "Vælg bad",
    image: "..."
  },
  {
    title: "Køkken",
    description: "Vælg køkken",
    image: null
  }
]

</script>

<template>
  <div id="progress-bar">
    <MaterialsProgressBar />
  </div>

  <section id="materials">
    <!-- Normal grid cards -->
    <MaterialCards
      v-for="(card, index) in imageCards"
      :key="'img-' + index"
      :title="card.title"
      :description="card.description"
      :image="card.image"
    />

    <!-- Stacked small cards -->
    <div class="materials__stack">
      <MaterialCards
        v-for="(card, index) in noImageCards"
        :key="'noimg-' + index"
        :title="card.title"
        :description="card.description"
        :image="card.image"
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