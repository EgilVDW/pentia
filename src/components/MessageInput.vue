<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update:modelValue", "send"]);

function onInput(e) {
  emit("update:modelValue", e.target.value);
}

function handleSend() {
  const text = props.modelValue.trim();
  if (!text) return;

  emit("send", text);
  emit("update:modelValue", "");
}
</script>
<template>
  <form @submit.prevent="handleSend">
    <input
      :value="modelValue"
      @input="onInput"
      type="text"
      placeholder="Skriv besked"
    />
    <button type="submit" :disabled="!modelValue.trim()">Send</button>
  </form>
</template>
