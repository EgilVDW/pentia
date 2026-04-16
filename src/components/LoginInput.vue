<script setup>
const model = defineModel();
defineProps({
  placeholder: {
    type: String,
    default: "Brugernavn"
  },
  name: {
    type: String,
    default: "Brugernavn"
  }
});
</script>

<template>
  <div class="login-input">
    <input type="email" v-model="model" :placeholder="placeholder" :name="name" class="login-input__field" />
  </div>
</template>

<style lang="scss" scoped>
.login-input {
  width: 100%;
  margin-bottom: 10px;
  background-color: $color-surface;
  border-radius: $border-radius-small;

  &__field {
    width: 100%;
    padding: 8px 25px;
    border: none;
    border-radius: $border-radius-small;
    font-size: $font-size-body;
    font-family: $font-family-base;
    transition: border-color 0.2s ease;
    color: $color-background;

    &::placeholder {
      color: $color-placeholder;
    }

    &:focus {
      outline: none;
      border-color: none;
      color: $color-foreground;
    }
  }
}
</style>