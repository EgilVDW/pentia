<script setup>
import BaseButton from "@/components/BaseButton.vue";
</script>
<template>
  <BaseButton v-bind="$attrs" class="center-button">
    <slot />
  </BaseButton>
</template>
<style scoped lang="scss">
.center-button {
  @include button;

  justify-content: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.375rem;
  text-align: center;
}
</style>
