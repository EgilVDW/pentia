<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
  items: Array,
});
</script>
<template>
  <div class="details-card">
    <div v-for="(item, index) in items" :key="index" class="details-card__item">
      <Icon :name="item.icon" class="details-card__icon" />
      <div class="details-card__content">
        <div class="details-card__label">{{ item.label }}</div>
        <div class="details-card__value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.details-card {
  border-radius: $border-radius-small;
  background-color: $color-surface;

  &__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  &__icon {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: $color-primary;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  &__label {
    font-size: $font-size-headline-2;
    font-weight: 700;
    line-height: $line-height-headline-2;
  }

  &__value {
    font-size: $font-size-body;
    font-weight: 200;
    line-height: $line-height-body;
  }
}

.details-card > * + * {
  border-top: 1px solid $color-background;
}
</style>
