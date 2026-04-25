<script setup>

const statusItems = [
  { label: "Færdigt", color: "#81a676" },
  { label: "Igang", color: "#f3e082" },
  { label: "Afventer", color: "#c4c4c4" }
]
</script>

<template>
  <main class="build-view">
    <content
      class="build-view__item"
      v-for="item in statusItems"
      :key="item.label"
    >
      <span
        class="build-view__indicator"
        :style="{ backgroundColor: item.color }"
    > </span>

      <span class="build-view__label">
        {{ item.label }}
      </span>
    </content>
  </main>
</template>

<style lang="scss" scoped>
.build-view {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-color: $color-surface;
  border-radius: $border-radius-small;
  font-family: $font-family-base;

  &__item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-block;
  }

  &__label {
    font-size: $font-size-body;
    color: $color-foreground;
  }
    &__indicator, &__label{
      align-items: baseline;
    }
}
</style>