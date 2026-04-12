<script setup>
import { computed, ref } from "vue"

const totalSteps = 7

const completedSteps = ref(0)

const progressPercent = computed(() => {
  return (completedSteps.value / totalSteps) * 100
})

const completeStep = () => {
  if (completedSteps.value < totalSteps) {
    completedSteps.value++
  }
}
</script>

<template>
  <section class="progress">
    <div class="progress__bar">
      <div
        class="progress__fill"
        :style="{ width: progressPercent + '%' }"
      ></div>
      <!-- TODO: Add checkmark icon -->
    </div>

    <div class="progress__text">
      {{ completedSteps }} / {{ totalSteps }}
    </div>

    <!-- Demo button -->
    <button class="progress__btn" @click="completeStep">
      Complete Step
    </button>
  </section>
</template>

<style scoped lang="scss">
.progress {
  &__bar {
    position: relative;
    width: 300px;
    height: 20px;
    background: #e5e5e5;
    border-radius: 999px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: $color-primary;
    transition: width 0.3s ease;
  }

  &__text {
    margin-top: 8px;
    font-size: 14px;
  }

  &__btn {
    margin-top: 10px;
  }
}
</style>