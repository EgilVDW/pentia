<script setup>
import { ref } from 'vue';
import Icon from './Icon.vue';

const model = defineModel();
const props = defineProps({
    placeholder: { 
        type: String, 
        default: 'Adgangskode' }
});

const isVisible = ref(false);
</script>

<template>
    <div class="login-password">
        <input 
            :type="isVisible ? 'text' : 'password'" 
            v-model="model" 
            :placeholder="placeholder"
            class="login-password__input" 
        />

        <button 
            type="button" 
            @click="isVisible = !isVisible" 
            class="login-password__toggle"
        >
            <Icon 
                :name="isVisible ? 'Skjul' : 'Vis'" 
                class="login-password__icon" 
            />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.login-password {
    position: relative;
    width: 100%;

    &__input {
        width: 100%;
        padding: 12px 0 12px 30px;
        border-radius: $border-radius-large;
        font-size: 16px;
        background-color: $color-surface;
        font-family: "Inter";

        &:focus {
            outline: none; 
        }
    }

    &__toggle {
        position: absolute;
        right: 12px;
        top: 25px;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        opacity: 0.6;

        &:hover {
            opacity: 1;
        }
    }

    &__icon {
        width: 2rem; 
        height: 2rem;

    }
}
</style>