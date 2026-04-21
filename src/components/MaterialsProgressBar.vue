<script setup>
import Icon from "@/components/Icon.vue"
import { computed, ref } from "vue"

// Potential improvement:
// TODO: Make steps dynamic based on amount of tasks from firebase.
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

        <div
          class="progress__icon"
          :style="{ left: progressPercent + '%' }"
        >
        <Icon name="Completed-tjekmark" />
      </div>
    </div>

    <div class="progress__text">
      {{ completedSteps }} / {{ totalSteps }} valg gennemført
    </div>

    <button class="progress__btn" @click="completeStep">
      Complete Step
    </button>
  </section>
</template>

<style scoped lang="scss">
.progress {
  display: flex;
  flex-direction: column;
  padding: 0 29px;

  &__bar {
    margin-top: 20px;
    position: relative;
    width: 300px;
    height: 20px;
    background: $color-surface;
    border-radius: $border-radius-large;
  }

  &__fill {
    height: 100%;
    background: $color-primary;
    transition: width 0.3s ease;
    border-radius: $border-radius-large;
  }

  &__icon {
  position: absolute;
  top: 55%;
  transform: translate(-50%, -50%);
  transition: left 0.3s ease;
  height: 30px;
  width: 30px;
  }

  &__text {
    margin-top: 8px;
    font-size: 14px;
  }

  &__btn {
    align-self: start;
    padding-top: 10px;
  }
}
</style>