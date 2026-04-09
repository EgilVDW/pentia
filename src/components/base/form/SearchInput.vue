<script setup>
import { ref, watch } from 'vue';

const searchText = ref('');
const emit = defineEmits(['search-change']);

watch(searchText, (newValue) => {
    emit('search-change', newValue);
});
</script>

<template>
    <div class="search-bar">
        <!-- magnifying glass icon here -->
         <input 
         type="text"
         v-model="searchText"
         placeholder="Søg">
    </div>
</template>

<style scoped>

</style>