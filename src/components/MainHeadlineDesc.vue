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
  <div class="main-text">
    <h2 class="main-text__headline">
      {{ title }}
    </h2>
    <p v-if="text" class="main-text__description">
      {{ text }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.main-text{
  padding: 0;
}
.main-text__headline{
  font-family: $font-family-base;
  font-size: $font-size-headline-1;
  font-weight: bold;
}
.main-text__description{
  white-space: pre-line;
  line-height: normal;
  font-size: $font-size-body;
}

</style>