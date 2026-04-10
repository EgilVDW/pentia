<script setup>

const model = defineModel();
const props = defineProps({
    placeholder: String
});
</script>

<template>
<div class="login-field">
    <input 
        type="text"
        v-model="model"
        :placeholder="placeholder"
        class="login-field__input"
    />
</div>
</template>

<style scoped>

</style>