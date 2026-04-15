<script setup>
import { ref } from "vue";
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
const tasks = ref([
  { left: "Fundament", right: "Færdig" },
  { left: "Råhus", right: "I gang" },
  { left: "Indvendigt", right: "Ikke startet" }
])
</script>


<template>
  <div class="project-status">
    <section class="project-status__content">
      <h2 class="project-status__title">Projektstatus</h2>
      <section class="project-status__tasks">
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="project-status__task-row"
        >
          <span class="project-status__task-name">{{ task.left }}</span>
          <span class="project-status__task-status">{{ task.right }}</span>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.project-status {
  width: 100vw;
  padding: 0rem 2rem;

    .project-status__content {
    width: 100%;
    margin: 2rem auto;
    color: $color-surface;

    .project-status__title {
      text-align: left;
      font-size: 1rem;
      font-weight: bold;
      padding: 0.25rem 1rem;
      border-top-left-radius: $border-radius-small;
      border-top-right-radius: $border-radius-small;
      background-color: $color-primary;
      margin-bottom: 0.125rem;
    }

    .project-status__tasks {
      display: flex;
      flex-direction: column;
      padding: 0rem 0rem;
      background-color: $color-primary;
      border-bottom-left-radius: $border-radius-small;
      border-bottom-right-radius: $border-radius-small;

      .project-status__task-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.875rem 0rem 0.875rem 0rem;
        margin: 0rem 1rem;
        font-size: $font-size-body;
        &:not(:last-child) {
          border-bottom: 1px dotted #fff;
        }
        .project-status__task-name {
          text-align: left;
        }

        .project-status__task-status {
          text-align: right;
        }
      }
    }
  }
}

</style>