<script setup>
</script>
<template>
  <div class="white-container">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.white-container{
  width: auto;
  min-height: 110px;
  margin: 1rem 1.5rem;
  padding: 0.4rem 0.75rem;
  background-color: $color-surface;
  border-radius: $border-radius-small;
}
</style>