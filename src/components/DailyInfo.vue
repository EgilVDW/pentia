<script setup>
import MediumWhiteContainer from "@/components/MediumWhiteContainer.vue";

defineProps({
  date: {
    type: String,
    required: true
  },
  constructionManager: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  }
})


</script>
<template>
  <MediumWhiteContainer>
    <span class="white-container__title">Dato:</span> {{ date }} <br>
    <span class="white-container__title">Byggeleder: </span>{{ constructionManager }} <br>
    <span class="white-container__title">Projekt: </span>{{ project }}
  </MediumWhiteContainer>
</template>
<style scoped lang="scss">
.white-container__title{
  font-weight: bold;
  line-height: 2rem;
}
</style>