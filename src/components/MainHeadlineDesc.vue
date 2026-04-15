<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <div class="position">
    <h2 class="headline">
      {{ title }}
    </h2>
    <p v-if="text" class="text">
      {{ text }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.headline{
  font-family: $font-family-base;
  font-size: $font-size-headline-1;
  font-weight: bold;
}
.text{
  white-space: pre-line;
  line-height: normal;
  font-size: $font-size-body;
}
.position{
  padding: 0.5rem 1.5rem;
}
</style>