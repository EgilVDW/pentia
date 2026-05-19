<script setup>
import HeaderBanner from "@/components/desktop/HeaderBanner.vue";
import Footer from "@/components/desktop/Footer.vue";
</script>
<template>
  <div class="default-layout">
    <HeaderBanner />
    <div class="default-layout__content">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  &__content {
    flex-grow: 1;
    padding: 3rem 4.375rem;
  }
}
</style>
