<script setup>
import HeaderBanner from "@/components/HeaderBanner.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>
<template>
  <div class="default-layout">
    <HeaderBanner />
    <div class="default-layout__content">
      <RouterView />
    </div>
    <NavigationBar />
  </div>
</template>
<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  &__content {
    flex-grow: 1;
    padding: 3rem 1.5rem;
  }
}
</style>
