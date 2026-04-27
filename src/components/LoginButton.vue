<script setup>
const emit = defineEmits(["click"]);

defineProps({
  type: {
    type: String,
    default: "button"
  },
  label: String
});
</script>

<template>
  <button :type="type" class="login-button" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.login-button {
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: $color-primary;
  color: $color-surface;
  border: none;
  border-radius: $border-radius-small;
  font-family: $font-family-base;
  font-size: $font-size-body;
  font-weight: 200;
  text-transform: none;
  transition: background-color 0.2s ease, transform 0.1s ease;

}
</style>