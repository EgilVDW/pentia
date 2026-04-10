<script setup>
import { ref } from 'vue';

const model = defineModel();
const props = defineProps({
    placeholder: String
});

const isVisible = ref(false);
</script>

<template>
    <div class="login-password">
        <input 
            :type="isVisible ? 'text' : 'password'" 
            v-model="model" 
            :placeholder="placeholder"
            class="login-password__input" />

        <button 
            type="button" 
            @click="isVisible = !isVisible" 
            class="login-password__toggle">
            
            <!--i :class="isVisible = ? ('icon here') : '(icon here)'"i-->
        </button>
    </div>
</template>

<style scoped>

</style>