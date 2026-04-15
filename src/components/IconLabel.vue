<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
  icon: String
});
</script>
<template>
  <span class="icon-label">
    <Icon v-if="icon" :name="icon" class="icon-label__icon" />
    <slot />
  </span>
</template>
<style scoped lang="scss">
.icon-label {
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;

  &__icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    color: $color-primary;
  }
}
</style>
