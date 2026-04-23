<script setup>
import BaseButton from "./BaseButton.vue";
defineProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 24
  },
  text: {
    type: String,
    default: ""
  }
})
</script>
<template>
  <BaseButton href="/" class="icon-container">
    <img
    :src="src"
    class="icon"
    :style="{ width: size + 'px', height: size + 'px' }"
    alt="icon"
    />
    <p>{{ text }}</p>
  </BaseButton>
</template>
<style scoped lang="scss">
.icon-container{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: $color-surface;
  padding: 1rem;
  border-radius: $border-radius-large;
  width: 50%;
  box-shadow: $drop-shadow;
  p{
    font-size: $font-size-body;
  }
}
.icon{
  display: block;
}
</style>