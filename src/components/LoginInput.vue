<script setup>
const model = defineModel();
const props = defineProps({
    placeholder: {
        type: String,
        default: 'Brugernavn'
    },
    autocomplete: {
        type: String, 
        default: 'Brugernavn'
    },
    name:{
        type: String,
        default: 'Brugernavn'
    }
});
</script>

<template>
    <div class="login-input">
        <input 
            type="text"
            v-model="model"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :name="name"
            class="login-input__field"
        />
    </div>
</template>

<style lang="scss" scoped>
.login-input {
    width: 100%;
    margin-bottom: 10px; 
    background-color: $color-surface;
    border-radius: $border-radius-large;

    &__field {
        width: 100%;
        padding: 8px 25px;
        border: none;
        border-radius: $border-radius-large; 
        font-size: 16px; 
        font-family: "Inter";
        transition: border-color 0.2s ease;
        color: $color-background;

        &::placeholder {
            color: $color-placeholder;
        }

        &:focus {
            outline: none;
            border-color: #1a3d4a; 
            color: $color-foreground;
        }
    }
}
</style>