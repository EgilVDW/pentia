<script setup>
import Icon from "@/components/Icon.vue";
import BaseButton from "@/components/BaseButton.vue";
defineProps({
  label: {
    type: String,
    required: true
  },
  iconLeft: {
    type: String,
    default: ""
  },
  iconRight: {
    type: String,
    default: ""
  }
})
</script>
<template>
  <BaseButton href="/" class="base-button">
    <Icon
    v-if="iconLeft"
    :name="iconLeft"
    class="base-button__icon"
    />
    <span class="base-button__text">{{ label }}</span>
    <Icon
    v-if="iconRight"
    :name="iconRight"
    class="base-button__icon base-button__icon--right"
    />
  </BaseButton>
</template>
<style scoped lang="scss">
.base-button{
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
  width: 164px;
  height: 38px;
  padding: 0rem 0.25rem;
  font-size: $font-size-body;
  background-color: $color-surface;
  border-radius: $border-radius-large;
  box-shadow: $drop-shadow;
}
.base-button__icon{
  grid-column: 1;
  width: 14px;
  height: 14px;
  justify-self: center;
}
.base-button__icon--right{
  grid-column: 3;
  transform: scaleX(-1);
  justify-self: center;
}
.base-button__text {
  grid-column: 2;
  justify-self: center;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>