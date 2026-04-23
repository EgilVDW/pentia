<script setup>
import ConstructionGallery from "@/components/ConstructionGallery.vue";

</script>

<template>
  <main class="gallery-view">
    <h1>Byggeplads billeder</h1>
    <ConstructionGallery />
  </main>
</template>

<style lang="scss" scoped>
.gallery-view {
  box-sizing: border-box;

  h1{
    color: $color-foreground;
    font-size: $font-size-headline-1;
    margin-bottom: 10px;
    font-weight: 700;
    padding-left: 4px;
    text-transform: none;
  }
}
</style>