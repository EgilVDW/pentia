<template>
  <div v-if="svgContent" v-html="svgContent"></div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
});

const icons = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

const svgContent = computed(() => {
  const key = `../assets/icons/${props.name}.svg`;
  const raw = icons[key] || null;
  if (!raw) return null;
  return icons[key] || null;
});
</script>
