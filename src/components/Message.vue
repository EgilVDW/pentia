<script setup>
defineProps({
  outgoing: Boolean,
  content: String,
  timestamp: String,
  status: String
});
</script>
<template>
  <div class="chat-message">
    <p
      class="chat-message__content"
      :class="
        outgoing
          ? 'chat-message__content--outgoing'
          : 'chat-message__content--incoming'
      "
    >
      {{ content }}
    </p>
    <time v-if="outgoing" class="chat-message__meta">{{ timestamp }}</time>
    <span class="chat-message__meta">{{ status }}</span>
  </div>
</template>
<style scoped lang="scss">
.chat-message {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  &__content {
    padding: 0.375rem;
    max-width: 12.5rem;
    border-radius: $border-radius-small;

    &--incoming {
      background-color: $color-surface;
    }

    &--outgoing {
      background-color: $color-primary;
      color: $color-surface;
    }
  }

  &__meta {
    color: $color-primary;
    font-size: 0.625rem;
    line-height: 1.25rem;
  }
}
</style>
