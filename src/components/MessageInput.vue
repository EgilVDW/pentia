<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update:modelValue", "send"]);

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
};

const handleSend = () => {
  const text = props.modelValue.trim();
  if (!text) return;

  emit("send", text);
  emit("update:modelValue", "");
};
</script>
<template>
  <form class="message-input" @submit.prevent="handleSend">
    <input
      :value="modelValue"
      type="text"
      placeholder="Skriv besked"
      class="message-input__field"
      @input="onInput"
    />
    <button
      type="submit"
      :disabled="!modelValue.trim()"
      class="message-input__button"
    >
      Send
    </button>
  </form>
</template>
<style scoped lang="scss">
.message-input {
  display: flex;
  border-radius: $border-radius-small;
  background-color: $color-surface;

  &__field {
    flex-grow: 1;
    padding: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__button {
    margin: 0.5rem;
    padding: 0.1875rem 1.75rem;
    border-radius: $border-radius-small;
    background-color: $color-primary;
    color: $color-surface;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
