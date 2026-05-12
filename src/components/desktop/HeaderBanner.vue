<script setup>
import miltonLogo from "@/assets/milton-logo.png";
</script>
<template>
  <header class="header-banner">
    <RouterLink to="/desktop">
      <img class="head-banner__img" :src="miltonLogo" alt="Milton logo" />
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
.header-banner {
  height: 8.0625rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 2rem 6.625rem;
  background-color: $color-primary;
  .head-banner__img {
    height: 3rem;
  }
}
</style>
