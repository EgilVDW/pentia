<script setup>

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <ul class="title-list">
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>
<style scoped lang="scss">
.title-list{
  list-style-type: disc;
  padding-left: 1.125rem;
  line-height: 2rem;
}
</style>