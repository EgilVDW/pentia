<script setup>
import Icon from "@/components/Icon.vue";

const props = defineProps({
  doc: {
    type: Object,
    required: true
  }
});

const formatDate = (date) => {
  if (!date) return "Dato mangler";


  const d = (date instanceof Date) ? date : (date.toDate ? date.toDate() : new Date(date));


  const dateString = d.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long"
  });

  const timeString = d.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit"
  }).replace(":", ".");

  return `${dateString}, ${timeString}`;
};

const openFile = () => {
  const url = props.doc.fileUrl;
  if (url && url !== "#") {
    window.open(url, "_blank");
  } else {
    alert("Filen er ikke klar endnu eller linket mangler.");
  }
};
</script>

<template>
  <div
    class="document-item"
    :class="{ 'document-item--has-file': doc.fileUrl && doc.fileUrl !== '#' }"
    @click="openFile"
  >
    <div class="document-item__icon-container">
      <Icon name="Dokumenter" />
    </div>

    <div class="document-item__info">
      <h4 class="document-item__name">{{ doc.name }}</h4>
      <p class="document-item__meta">
        {{ doc.category }} • {{ formatDate(doc.date) }}
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
  transition: all 0.2s ease;
  width: 100%;
  height: 55px;

  &:hover {
    background-color: lighten($color-surface, 2%);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
    background-color: darken($color-surface, 5%);
  }

  &__icon-container {
    color: $color-foreground;
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    overflow: hidden;
  }

  &__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
    color: $color-foreground;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__meta {
    margin: 0;
    font-size: 12px;
    color: $color-placeholder;
    text-transform: capitalize;
  }
}
</style>