<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
  doc: Object
});

const formatDate = (date) => {
  if (!date) return "Dato mangler";
  const d = date.toDate ? date.toDate() : new Date(date);
  return (
    d.toLocaleDateString("da-DK", {
      day: "numeric",
      month: "long"
    }) + `, ${d.getHours()}.${d.getMinutes()}`
  );
};

const openFile = (url) => {
  if (url) window.open(url, "_blank");
};
</script>

<template>
  <div class="document-item" @click="openFile(doc.fileUrl)">
    <div class="document-item__icon-container">
      <Icon name="Dokumenter" />
    </div>

    <div class="document-item__info">
      <h4 class="document-item__name">{{ doc.name }}</h4>
      <p class="document-item__meta">
        {{ doc.category }}, {{ formatDate(doc.date) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.document-item {
  background-color: $color-surface;
  border-radius: $border-radius-large;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%;
  height: 55px;

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg) {
      width: 30px;
      height: 30px;
      color: $color-foreground;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    color: $color-foreground;
  }

  &__meta {
    margin: 0;
    font-size: 12px;
    color: $color-foreground;
    font-weight: 200;
  }
}
</style>
