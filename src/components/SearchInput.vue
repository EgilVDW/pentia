<script setup>
import Icon from "@/components/Icon.vue";
import { ref, watch } from "vue";

const searchText = ref("");
const emit = defineEmits(["search-change"]);

watch(searchText, (newValue) => {
  emit("search-change", newValue.trim());
});
</script>

<template>
  <div class="search-bar">
    <div class="search-bar__icon-container">
      <Icon name="Soegning"></Icon>
    </div>

    <input
      type="text"
      v-model="searchText"
      placeholder="Søg"
      class="search-bar__input"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  display: flex;

  &__input {
    width: 100%;
    height: 2.375rem;
    padding: 12px 16px 12px 45px;
    font-size: 1rem;
    border: none;
    font-family: $font-family-base;
    color: $color-foreground;
    background-color: $color-surface;
    border-radius: $border-radius-large;

    &:focus {
      border-color: $color-background;
      outline: none;
    }
  }

  &__icon-container {
    position: absolute;
    left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: $color-foreground;

    > div {
      height: 20px;
      width: 20px;
      margin-top: 10px;
    }
  }
}
</style>
