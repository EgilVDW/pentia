<!-- TODO: Fix Icon loader to load icon correctly and add styling to cards! -->
<script setup>
import Icon from "@/components/Icon.vue";
import { computed } from "vue";

const props = defineProps({
  title: String,
  description: String,
  image: {
    type: String,
    default: null
  },
  alt: String,
  selected: Boolean
})

// const isSelected = ref(false)
const emit = defineEmits(["toggle"])

const handleClick = () => {
  // isSelected.value = !isSelected.value
  emit("toggle")
}

const cardClasses = computed(() => [
  "material-card",
  {
    "material-card--selected": props.selected,
    "material-card--no-image": !props.image
  }
])
</script>

<template>
  <div :class="cardClasses" @click="handleClick">

    <div v-if="image" class="material-card__image">
      <img :src="image" alt="" />

      <div
        v-if="selected"
        class="material-card__checkmark material-card__checkmark--image"
      >
        <Icon name="Completed-tjekmark" />
      </div>
    </div>

    <div class="material-card__content">
      <div class="material-card__text">

        <div class="material-card__title-row">
          <h3 class="material-card__title">
            {{ title }}
          </h3>

          <div
            v-if="selected && !image"
            class="material-card__checkmark material-card__checkmark--inline"
          >
            <Icon name="Completed-tjekmark" />
          </div>
        </div>

        <p class="material-card__description">
          {{ description }}
        </p>
      </div>
        <Icon class="material-card__arrow" name="Frem-tilbage-pil" />
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
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &--image {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    &--inline {
      position: static;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 13px;
    background: $color-surface;
  }

  &__text {
    display: flex;
    flex-direction: column;
    margin: 4px 0 0;
  }

  &__title {
    font-size: $font-size-body;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__description {
    font-size: 10px;
  }

  &__arrow {
    transform: rotate(180deg);
    height: 25px;
    width: 25px;
  }
}

.material-card--no-image {
  height: 78px;
}
</style>