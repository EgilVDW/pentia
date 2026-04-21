<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String
});

const icons = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default"
});

const svgContent = computed(() => {
  const key = `../assets/icons/${props.name}.svg`;
  return icons[key] || null;
});
</script>
<template>
  <div v-if="svgContent" v-html="svgContent" class="icon"></div>
</template>
<style lang="scss">
.icon svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
