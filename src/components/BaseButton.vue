<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  href: String,
  external: Boolean,
  type: String
});

const component = computed(() => {
  if (!props.href) return "button";
  if (!props.external) return RouterLink;
  return "a";
});

const componentAttrs = computed(() => {
  if (!props.href) {
    return { type: props.type || "button" };
  }

  if (!props.external) {
    return { to: props.href };
  }

  return {
    href: props.href,
    rel: "noopener noreferrer"
  };
});
</script>
<template>
  <component :is="component" v-bind="componentAttrs">
    <slot />
  </component>
</template>