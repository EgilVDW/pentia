<!-- TODO: Fix Icon loader to load icon correctly and add styling to cards! -->
<script setup>
import Icon from "@/components/Icon.vue";
import { computed, ref } from "vue";

const props = defineProps({
  title: String,
  description: String,
  image: {
    type: String,
    default: null
  },
  alt: String
})

const isSelected = ref(false)

const handleClick = () => {
  isSelected.value = !isSelected.value
}

const cardClasses = computed(() => [
  "material-card",
  {
    "material-card--selected": isSelected.value,
    "material-card--no-image": !props.image
  }
])
</script>

<template>
  <div :class="cardClasses" @click="handleClick">

    <div v-if="image" class="material-card__image">
      <img :src="image" alt="" />

      <div
        v-if="isSelected"
        class="material-card__checkmark material-card__checkmark--image"
      >
        <Icon name="Completed-tjekmark" />
      </div>
    </div>
    <!-- <div v-else class="material-card__image material-card--no-image"></div> -->

    <div class="material-card__content">
      <div class="material-card__text">

        <div class="material-card__title-row">
          <h3 class="material-card__title">
            {{ title }}
          </h3>

          <div
            v-if="isSelected && !image"
            class="material-card__checkmark material-card__checkmark--inline"
          >
            <Icon name="Completed-tjekmark" />
          </div>
        </div>

        <p class="material-card__description">
          {{ description }}
        </p>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.material-card {
  border-radius: $border-radius-large;
  overflow: hidden;
  background: $color-surface;
  cursor: pointer;
  box-shadow: $drop-shadow;
  transition: 0.2s ease;

  &__title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__image {
    position: relative;
    height: 95px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__checkmark {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--image {
      position: absolute;
      top: 12px;
      right: 12px;

      :deep(svg) {
        width: 24px;
        height: 24px;
      }
    }

    &--inline {
      position: static;

      :deep(svg) {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px;
    background: $color-surface;
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }

  &__description {
    font-size: 14px;
    margin: 4px 0 0;
  }
}
</style>