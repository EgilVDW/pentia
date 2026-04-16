<script setup>
import { ref } from "vue";

defineProps({
  label: String,
  options: Array
});

const emit = defineEmits(["select"]);
const isOpen = ref(false);
const selectedValue = ref("");

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedValue.value = option.label;
  emit("select", option.value);
  isOpen.value = false;
};
</script>

<template>
  <div class="select-input">
    <button type="button" class="select-input__button" @click="toggleDropdown">
      <div class="select-input__icon-container">
        <slot name="icon"></slot>
      </div>

      <span class="select-input__label">
        {{ selectedValue ? selectedValue : label }}
      </span>
    </button>

    <div v-if="isOpen" class="select-input__dropdown">
      <ul class="select-input__list">
        <li
          v-for="option in options"
          :key="option.value"
          class="select-input__item"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-input {
  position: relative;
  width: 167px;
  font-family: $font-family-base;

  &__button {
    width: 100%;
    height: 38px;
    background-color: $color-surface;
    border: none;
    border-radius: $border-radius-large;
    padding: 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg),
    :deep(i),
    :deep(img) {
      width: 1.25rem;
      height: 1.25rem;
      color: $color-foreground;
    }
  }

  &__label {
    font-size: 14px;
    white-space: nowrap;
    color: $color-foreground;
    font-weight: 400;
    text-overflow: ellipsis;
  }

  &__dropdown {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $color-surface;
    border-radius: $border-radius-large;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    padding: 0;
    overflow: hidden;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    padding: 12px 16px;
    font-size: 1rem;
    color: $color-foreground;
    cursor: pointer;

    &:hover {
      background-color: $color-surface;
    }
  }
}
</style>
