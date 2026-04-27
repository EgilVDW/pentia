<script setup>
import { ref } from "vue";
import ConstructionStatus from "@/components/ConstructionStatus.vue";
import FloorplanUpdate from "@/components/FloorplanUpdate.vue";


const overallProgress = ref(0);

</script>

<template>
  <main class="status-view">
    <h1><span>Status</span></h1>
    <h2><span>Adresse:</span> Holkebjergvej 76</h2>
    <h2><span>Byggeleder:</span> Kim Agerbæk</h2>

    <header class="status-view__header">
      <!--<progress-bar :progress="overallProgress" /> component here> -->
      progress bar her
    </header>

    <content class="status-view__card">
      <section class="status-view__content">
        <FloorplanUpdate :progress="overallProgress"/>
      </section>

      <footer class="status-view__overview">
        <ConstructionStatus />
      </footer>
    </content>
  </main>
</template>

<style lang="scss" scoped>
.status-view {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;

  h1 {
    font-size: $font-size-headline-1;
  }

  h2 {
    font-family: $font-family-base;
    font-size: $font-size-headline-2;
  }

    span{
      font-weight: 700;
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
    height: 2.2rem;

}


  &__footer {
    justify-content: space-between;
  }
}
</style>