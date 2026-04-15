<script setup>
import BaseButton from "@/components/BaseButton.vue";
import IconLabel from "@/components/IconLabel.vue";

defineProps({
  icon: String,
});
</script>
<template>
  <BaseButton v-bind="$attrs" class="icon-button">
    <IconLabel :icon="icon">
      <slot />
    </IconLabel>
  </BaseButton>
</template>
<style scoped lang="scss">
.icon-button {
  @include button;

  font-size: $font-size-body;
  line-height: $line-height-body;
}
</style>
