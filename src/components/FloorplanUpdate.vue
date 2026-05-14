<script setup>
import { computed } from "vue";

const props = defineProps({
  progress: {
    type: Number,
    required: true
  }
});

const currentPlanImage = computed(() => {
  if (props.progress >= 100) return "plantegning_100.png";
  if (props.progress >= 75) return "plantegning_75.png";
  if (props.progress >= 50) return "plantegning_50.png";
  if (props.progress >= 25) return "plantegning_25.png";
  return "plantegning_base.png";
});

const getImageUrl = (name) => {
  if (!name) return "";

  try {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
  } catch {
    return "";
  }
};
</script>

<template>
  <main class="floorplan-update">
    <transition name="fade" mode="out-in">
      <img
        :key="currentPlanImage"
        :src="getImageUrl(currentPlanImage)"
        alt="Plantegning"
        class="floorplan-update__image"
      />
    </transition>
  </main>
</template>

<style lang="scss" scoped>
.floorplan-update {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  &__image {
    width: 100%;
    transform: scale(2.3);
    height: auto;
    object-fit: contain;
    transition: all 0.3s ease-in-out;
  }
}
</style>