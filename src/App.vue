<script setup>
import HeaderBanner from "@/components/HeaderBanner.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>
<template>
  <div class="app">
    <HeaderBanner />
    <div class="app__content">
      <RouterView />
    </div>
    <NavigationBar />
  </div>
</template>
<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  &__content {
    flex-grow: 1;
  }
}
</style>
