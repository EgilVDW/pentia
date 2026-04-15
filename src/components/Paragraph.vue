<script setup>
defineProps({
  label: String
});
</script>
<template>
  <p class="paragraph">
    <span v-if="label" class="paragraph__label">{{ `${label}: ` }}</span>
    <slot />
  </p>
</template>
<style scoped lang="scss">
.paragraph {
  font-size: 0.875rem;
  line-height: 1.25rem;

  &__label {
    font-weight: 700;
  }
}
</style>
