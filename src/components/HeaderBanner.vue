<script setup>
import userIcon from "@/assets/icons/user-icon.png";
import miltonLogo from "@/assets/milton-logo.png";
import BaseButton from "./BaseButton.vue";
</script>
<template>
  <header class="header-banner">
    <img class="head-banner__img" :src="miltonLogo" alt="Milton logo">
    <BaseButton href="/">
      <img class="head-banner__img" :src="userIcon" alt="Profile icon">
    </BaseButton>
  </header>
</template>

<style scoped lang="scss">
.header-banner{
  height: 129px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 2rem 1.5rem;
  background-color: $color-primary;
  .head-banner__img{
    height: 48px;
  }
}
</style>