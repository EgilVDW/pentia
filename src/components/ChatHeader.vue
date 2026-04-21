<script setup>
import { RouterLink } from "vue-router";
import Icon from "@/components/Icon.vue";

defineProps({
  name: String,
  role: String,
  status: String
});

const getStatus = (status) => {
  const map = {
    online: "Aktiv",
    offline: "Inaktiv"
  };

  return map[status] ?? status;
};
</script>
<template>
  <header class="chat-header">
    <RouterLink to="/profile" class="chat-header__return">
      <Icon name="Frem-tilbage-pil" class="chat-header__return-icon" />
    </RouterLink>
    <div class="chat-header__content">
      <h1 class="chat-header__title">Beskeder</h1>
      <div>
        <div class="chat-header__user-label">{{ `${name} - ${role}` }}</div>
        <div class="chat-header__status">
          <div
            class="chat-header__status-indicator"
            :class="
              status === 'online'
                ? 'chat-header__status-indicator--online'
                : 'chat-header__status-indicator--offline'
            "
          ></div>
          <div class="chat-header__status-label">{{ getStatus(status) }}</div>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
.chat-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.625rem 1.875rem;
  border-top: 1px solid $color-highlight;
  background-color: $color-primary;
  color: $color-surface;

  &__return {
    width: fit-content;
  }

  &__return-icon {
    width: 1.125rem;
    height: 1.125rem;
    color: $color-secondary;
  }

  &__content {
    text-align: center;
  }

  &__title {
    margin: 0.75rem 0 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  &__user-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 0.3125rem;
  }

  &__status-indicator {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 100%;

    &--online {
      background-color: #4fff75;
    }

    &--offline {
      background-color: #808080;
    }
  }

  &__status-label {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
