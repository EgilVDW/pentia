<script setup>
defineProps({
  activity: {
    type: Object,
    required: true
  }
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
            Kl {{ activity.time }}
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
  background: #d9d9d9;
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
  }

  &__time {
    font-size: 0.9rem;
    color: #333;
  }

  &__button {
    background: #fee185;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>