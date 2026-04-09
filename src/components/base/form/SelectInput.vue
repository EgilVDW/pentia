<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  options: Array,
  icon: String
});

const isOpen = ref(false);

const selectedValue = ref('');

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const emit = defineEmits(['select']);

const selectOption = (option) => {
  emit('select', option.value);
  isOpen.value = false;
  selectedValue.value = option.label;
};
</script>

<template>
  <div class="select">

    <button @click="toggleDropdown">
      <i id="icon" :class="icon"></i>
      {{ selectedValue ? selectedValue : label }}
    </button>
    <div class="select__content" v-if="isOpen">
      <div class="select-content__item" 
        v-for="option in options" 
        :key="option" 
        @click="selectOption(option)">
          {{ option.label }}
      </div>
    </div>

  </div>
</template>

<style scoped>
.select {
  border: 2px solid grey;
  width: 100px;
  margin: 10px 2px 2px 10px;
}

.select button{
  display: flex;
  gap: 8px;
}
</style>