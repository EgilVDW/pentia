<script setup>
import IconLabel from "@/components/IconLabel.vue";
import { computed } from "vue";

const props = defineProps({
  avatar: String,
  role: String,
  name: String,
  phoneNumber: String
});

const href = computed(() => {
  return `tel:${props.phoneNumber.replace(/[^\d+]/g, "")}`;
});
</script>
<template>
  <div class="contact-card">
    <div class="contact-card__profile">
      <img :src="avatar" class="contact-card__avatar" />
      <div class="contact-card__content">
        <div class="contact-card__role">{{ role }}</div>
        <div class="contact-card__name">{{ name }}</div>
      </div>
    </div>
    <a :href="href" class="contact-card__contact">
      <IconLabel icon="Opkald" class="contact-card__contact-content">{{
        phoneNumber
      }}</IconLabel>
    </a>
  </div>
</template>
<style scoped lang="scss">
.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem;
  border-radius: $border-radius-small;
  background-color: $color-surface;
  box-shadow: $drop-shadow;

  &__profile {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  &__avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    object-fit: cover;
    flex-shrink: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
  }

  &__role {
    font-size: $font-size-headline-2;
    font-weight: 700;
    line-height: $line-height-headline-2;
  }

  &__name {
    font-size: $font-size-body;
    font-weight: 200;
    line-height: $line-height-body;
  }

  &__contact {
    font-size: $font-size-headline-2;
    font-weight: 200;
    line-height: $line-height-headline-2;
  }

  &__contact-content {
    margin: 0 1rem;
    text-decoration: underline;
    text-underline-offset: 20%;
  }
}
</style>
