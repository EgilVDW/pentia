<script setup>
import ConstructionStatus from "@/components/ConstructionStatus.vue";
import FloorplanUpdate from "@/components/FloorplanUpdate.vue";
// import MaterialsProgressBar from "@/components/MaterialsProgressBar.vue";
import { ref } from "vue";


const overallProgress = ref(0);

</script>

<template>
  <div class="status-view">
    <h1><strong>Status</strong></h1>
    <h2><strong>Adresse:</strong> Holkebjergvej 76</h2>
    <h2><strong>Byggeleder:</strong> Kim Agerbæk</h2>

    <header class="status-view__header">
      <!-- <MaterialsProgressBar :progress="overallProgress" /> -->
      progress bar her
    </header>

    <div class="status-view__card">
      <section class="status-view__content">
        <FloorplanUpdate :progress="overallProgress"/>
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
    max-width: 380px;
    border-radius: $border-radius-small;
    border: none;
    overflow: hidden;
  }

  &__header {
    padding: 30px;
  }

  &__content {
    background-color: $color-surface;
    padding: 30px 1px 0px 1px;
    flex-grow: 1;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__overview {
    background-color: $color-surface;
    border-radius: $border-radius-small;
    padding: 1px 1px;
}


  &__footer {
    justify-content: space-between;
  }
}
</style>