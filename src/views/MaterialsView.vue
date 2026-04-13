<script setup>
import MaterialCards from "@/components/MaterialCards.vue";
import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";

const cards = [
  {
    title: "Bad",
    description: "Valgt: Bad & fliser",
    image: "/images/bathroom.jpg"
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
    <MaterialCards
      v-for="(card, index) in cards"
      :key="index"
      :title="card.title"
      :description="card.description"
      :image="card.image"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>