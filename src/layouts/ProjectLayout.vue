<script setup>
import { RouterLink } from "vue-router";

const links = [
  {
    name: "3D tegning",
    routeName: "3d-tegning"
  },
  {
    name: "Dagsopdatering",
    routeName: "dagsopdatering"
  },
  {
    name: "Billeder",
    routeName: "billeder"
  },
  {
    name: "Kontakt",
    routeName: "kontakt"
  },
  {
    name: "Dokumenter",
    routeName: "dokumenter"
  },
  {
    name: "Kalender",
    routeName: "kalender"
  },
  {
    name: "Materialevalg",
    routeName: "materialevalg"
  }
];
</script>
<template>
  <div class="project-layout">
    <nav>
      <ul class="project-layout__list">
        <li>
          <RouterLink
            :to="{ name: 'bygherre' }"
            class="project-layout__link"
            exact-active-class="project-layout__link--active"
            >Bygherre</RouterLink
          >
        </li>
        <li v-for="link in links" :key="link.routeName">
          <RouterLink
            :to="{ name: link.routeName }"
            class="project-layout__link"
            active-class="project-layout__link--active"
            >{{ link.name }}</RouterLink
          >
        </li>
      </ul>
    </nav>
    <div class="project-layout__content">
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="scss">
.project-layout {
  &__list {
    display: flex;
    gap: 0.25rem;
    width: 100%;
    overflow-x: auto;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    border-radius: $border-radius-small $border-radius-small 0 0;
    height: calc(3.125rem + $border-radius-small);
    background-color: #ebeaea;
    color: #787878;
    white-space: pre;

    &--active {
      background-color: $color-surface;
      color: $color-foreground;
    }
  }

  &__content {
    padding: 3rem;
    background-color: $color-surface;
    border-radius: $border-radius-small;
    transform: translateY(calc(-1 * $border-radius-small));
  }
}
</style>
