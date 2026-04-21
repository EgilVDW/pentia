<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="img-wrapper">
    <img :src="src" alt="">
  </div>
</template>
<style scoped lang="scss">
.img-wrapper{
  width: 100%;
  aspect-ratio: 1.6 / 1;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>