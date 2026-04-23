<script setup>
import { computed } from "vue";

const props = defineProps({
  tag: {
    type: String,
    default: "h2"
  },
  size: {
    type: String,
    default: null
  }
});

const size = computed(() => {
  if (props.size === "large") {
    return "heading--large";
  } else if (props.size === "medium") {
    return "heading--medium";
  } else if (props.size === "small") {
    return "heading--small";
  }
});
</script>
<template>
  <component :is="tag" class="heading" :class="size">
    <slot />
  </component>
</template>
<style scoped lang="scss">
.heading {
  font-weight: 700;

  &--large {
    font-size: 1.25rem;
    line-height: 1.25rem;
  }

  &--medium {
    font-size: 1rem;
    line-height: 0.1875rem;
  }

  &--small {
    font-size: $font-size-body;
    line-height: $line-height-body;
  }
}
</style>
