<script setup>
import Icon from "@/components/Icon.vue"
import { computed } from "vue"

const props = defineProps({
  completedSteps: Number,
  totalSteps: Number,
  progress: Number
})

const progressPercent = computed(() => {
  if (props.totalSteps !== undefined && props.completedSteps !== undefined) {
    if (props.totalSteps <= 0) return 0
    const calc = (props.completedSteps / props.totalSteps) * 100
    return Math.min(Math.max(calc, 0), 100)
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

    <div v-if="completedSteps || totalSteps" class="progress__text">
      {{ props.completedSteps }} / {{ props.totalSteps }} valg gennemført
    </div>
    <div v-else class="progress__text">{{ progressPercent }}%</div>
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