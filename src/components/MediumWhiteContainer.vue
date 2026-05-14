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
  margin: 0.75rem 0rem 1.75rem 0rem;
  padding: 0.4rem 0.75rem;
  background-color: $color-surface;
  border-radius: $border-radius-small;
}
</style>