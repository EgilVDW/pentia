<script setup>
import ConstructionGallery from "@/components/ConstructionGallery.vue";


</script>

<template>
  <div class="gallery-view">
    <h1><strong>Byggeplads billeder</strong></h1>
    <ConstructionGallery />
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  padding: 40px 20px;
  background-color: $color-secondary;
  min-height: 100vh;
  box-sizing: border-box;

  h1{
    color: $color-foreground;
    font-size: $font-size-headline-1;
    margin-bottom: 10px;
    padding-left: 5px;
    text-transform: none;
  }
}
</style>