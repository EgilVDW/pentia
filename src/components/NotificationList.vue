<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
  items: Array
});
</script>
<template>
  <ul class="notification-list">
    <li v-for="(item, index) in items" :key="index">
      <RouterLink to="/" class="notification-list__item">
        <Icon name="Notifikationer" class="notification-list__icon" />
        <div class="notification-list__content">{{ item.content }}</div>
        <Icon name="Frem-tilbage-pil" class="notification-list__arrow" />
      </RouterLink>
    </li>
  </ul>
</template>
<style scoped lang="scss">
.notification-list {
  border-radius: $border-radius-small;
  background-color: $color-surface;

  &__item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.625rem;
  }

  &__icon {
    flex-shrink: 0;
    width: 1.125rem;
    height: 1.125rem;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: $font-size-body;
    line-height: $line-height-body;
  }

  &__arrow {
    flex-shrink: 0;
    width: 0.875rem;
    height: 0.875rem;
    transform: rotate(180deg);
  }
}

.notification-list > * + * {
  border-top: 1px solid $color-background;
}
</style>
