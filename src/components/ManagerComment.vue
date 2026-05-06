<script setup>

defineProps({
  src: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="card">
    <span class="time-stamp">{{ time }}</span>
    <div class="column-container">
      <div class="column-container__image-wrap">
        <img :src="src" alt="">
      </div>
      <div>
        <h2 class="column-container__title">{{ name }}</h2>
        <p class="column-container__text">{{ comment }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card{
  position: relative;
}
.time-stamp{
  position: absolute;
  top: 12px;
  right: 0;
  font-size: 10px;
  color: $color-placeholder;
}
.column-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}
.column-container__image-wrap{
  flex-shrink: 0;
  img{
    margin-top: 0.375rem;
  }
}
.column-container img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}
.column-container__title{
  font-size: $font-size-headline-1;
  margin-top: 1.25rem;
}
.column-container__text{
  font-size: $font-size-body;
  word-break: break-word;
  margin-bottom: 0.5rem;
}
</style>