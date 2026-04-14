<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    label: String
});
</script>

<template>
    <button 
        :type="type" 
        class="login-button" 
        @click="emit('click')"
    >
    <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.login-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: $color-primary; 
    color: $color-surface;
    border: none;
    border-radius: $border-radius-large;
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: 300;
    text-transform: none; 
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

}
</style>