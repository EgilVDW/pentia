<script setup>
import Icon from "@/components/Icon.vue";

defineProps({
  avatar: String,
  name: String,
  email: String
});
</script>
<template>
  <div class="profile-card">
    <button class="profile-card__avatar">
      <img :src="avatar" alt="User avatar" class="profile-card__avatar-image" />
      <Icon name="Rediger-profil" class="profile-card__avatar-edit-icon" />
    </button>
    <div class="profile-card__content">
      <div class="profile-card__name">{{ name }}</div>
      <div class="profile-card__email">{{ email }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.profile-card {
  display: flex;
  gap: 1.25rem;
  padding: 0.75rem;
  border-radius: $border-radius-small;
  background-color: $color-primary;
  color: $color-surface;

  &__avatar-button {
    position: relative;
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
  }

  &__avatar {
    border-radius: 100%;
    object-fit: cover;
  }

  &__edit-avatar {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.375rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 100%;
    background-color: $color-highlight;
    color: $color-foreground;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.1875rem;
  }

  &__name {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.1875rem;
  }

  &__email {
    font-size: 0.75rem;
    font-weight: 200;
    line-height: 0.9375rem;
  }
}
</style>
