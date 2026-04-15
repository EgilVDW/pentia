<script setup>
import Home from "@/assets/icons/Forside.svg";
import Chat from "@/assets/icons/Beskeder.svg";
import Status from "@/assets/icons/Status.svg";
import BaseButton from "./BaseButton.vue";
</script>
<template>
  <section class="nav-container">
    <BaseButton href="/" class="nav-container__link">
      <Home class="nav-container__icon" />
      <p class="nav-container__title">Home</p>
    </BaseButton>
    <BaseButton href="/" class="nav-container__link">
      <Chat class="nav-container__icon" />
      <p class="nav-container__title">Beskeder</p>
    </BaseButton>
    <BaseButton href="/" class="nav-container__link">
      <Status class="nav-container__icon" />
      <p class="nav-container__title">Status</p>
    </BaseButton>
  </section>
</template>
<style scoped lang="scss">
.nav-container{
  display: flex;
  justify-content: space-between;
  width: 100vw;
  background-color: $color-primary;
  padding: 1.5rem 1rem;
  .nav-container__link{
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-container__icon{
      color: $color-highlight;
      height: 42px;
    }
    .nav-container__title{
      font-size: $font-size-body;
      color: $color-surface;
    }
  }
}
</style>