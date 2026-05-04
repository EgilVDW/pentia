<script setup>
import { computed } from "vue"

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const formattedTime = computed(() => {
  if (!props.activity.date) return ""

  return props.activity.date.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit"
  })
})
</script>

<template>
  <div class="activity-card">
    <div class="activity-card__content">
      <div class="activity-card__left">
        <span class="activity-card__dot"></span>

        <div class="activity-card__text">
          <p class="activity-card__title">
            {{ activity.title }}
          </p>
          <p class="activity-card__time">
            Kl {{ formattedTime }}
          </p>
        </div>
      </div>

      <button class="activity-card__button">
        Se mere
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activity-card {
  background: $color-surface;
  padding: 1rem;
  border-radius: 8px;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  &__dot {
    width: 12px;
    height: 12px;
    background: #1f4a4f;
    border-radius: 2px;
    margin-top: 6px;
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 600;
    font-size: $font-size-headline-2;
  }

  &__time {
    font-size: $font-size-body;
    color: #333;
  }

  &__button {
    background: $color-highlight;
    padding: 0.25rem 0.5rem;
    border-radius: $border-radius-large;
    cursor: pointer;
    box-shadow: $drop-shadow;
  }
}
</style>