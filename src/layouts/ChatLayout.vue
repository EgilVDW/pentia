<script setup>
import HeaderBanner from "@/components/HeaderBanner.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>
<template>
  <div class="chat-layout">
    <HeaderBanner />
    <div class="chat-layout__content">
      <RouterView />
    </div>
    <NavigationBar />
  </div>
</template>
<style scoped lang="scss">
.chat-layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
