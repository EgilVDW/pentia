<script setup>
import Icon from "@/components/Icon.vue"
import { computed } from "vue"

// Potential improvement:
// TODO: Make steps dynamic based on amount of tasks from firebase.
const props = defineProps({
  completedSteps: Number,
  totalSteps: Number,
  progress: Number
})

const isStepMode = computed(() => {
  return props.completedSteps !== undefined && props.totalSteps !== undefined
})

const progressPercent = computed(() => {
  if (isStepMode.value) {
    if (!props.totalSteps) return 0
    return (props.completedSteps / props.totalSteps) * 100
  }
  return props.progress ?? 0
})
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

    <div v-if="isStepMode" class="progress__text">
      {{ completedSteps }} / {{ totalSteps }} valg gennemført
    </div>
    <div v-else class="progress__text">{{ Math.round(progressPercent) }}%</div>
  </section>
</template>

<style scoped lang="scss">
.progress {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;

  &__bar {
    margin-top: 1.75rem;
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
    margin-top: 1rem;
    font-size: $font-size-headline-2;
  }
}
</style>