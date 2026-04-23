<script setup>
import BaseButton from "./BaseButton.vue";
import Icon from "./Icon.vue";
</script>
<template>
  <section class="nav-container">
    <BaseButton href="/" class="nav-container__link">
      <Icon name="Forside" class="nav-container__icon" />
      <p class="nav-container__title">Home</p>
    </BaseButton>
    <BaseButton href="/" class="nav-container__link">
      <Icon name="Beskeder" class="nav-container__icon" />
      <p class="nav-container__title">Beskeder</p>
    </BaseButton>
    <BaseButton href="/" class="nav-container__link">
      <Icon name="Status" class="nav-container__icon" />
      <p class="nav-container__title">Status</p>
    </BaseButton>
  </section>
</template>
<style scoped lang="scss">
.nav-container {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: $color-primary;
  padding: 1.5rem 3.25rem;
  .nav-container__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    .nav-container__icon {
      color: $color-highlight;
      height: 32px;
    }
    .nav-container__title {
      font-size: $font-size-body;
      color: $color-surface;
    }
  }
}
</style>
