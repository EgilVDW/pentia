<script setup>
import UploadImages from "@/components/UploadImages.vue";
import { ref } from "vue";

const fakeUser = ref("");
fakeUser.value = "FVyJCzaC2MGGqbDsDwsF";
</script>

<template>
  <UploadImages :user="fakeUser"/>
</template>

<style scoped lang="scss">
</style>