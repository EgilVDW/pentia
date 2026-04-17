<script setup>
import ConstructionStatus from "@/components/ConstructionStatus.vue";
import { ref } from "vue";

const overallProgress = 25;
const rooms = ref({
  entre: "færdig",
  stue: "igang",
  kontor: "afventer"
});
</script>

<template>
  <div class="status-view">
    <h1><strong>Status</strong></h1>
    <h2><strong>Adresse:</strong> Holkebjergvej 76</h2>
    <h2><strong>Byggeleder:</strong> Kim Agerbæk</h2>

    <header class="status-view__header">
      <!--<progress-bar component here> -->
      progress bar her
    </header>

    <div class="status-view__card">
      <section class="status-view__content">
        Plantegning her
      </section>

      <footer class="status-view__overview">
        <ConstructionStatus />
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.status-view {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  padding: 50px;
  background-color: $color-secondary;

  h1 {
    font-size: $font-size-headline-1;
  }

  h2 {
    font-family: $font-family-base;
    font-size: $font-size-headline-2;
  }

  &__card {
    width: 100%;
    max-width: 420px;
    border-radius: $border-radius-small;
    border: none;
    overflow: hidden;
  }

  &__header {
    padding: 30px;
  }

  &__content {
    background-color: $color-surface;
    padding: 30px 20px;
    flex-grow: 1;
    margin-bottom: 10px;
  }

  &__footer {
    justify-content: space-between;
  }
}
</style>