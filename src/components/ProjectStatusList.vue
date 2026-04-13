<script setup>
import { ref } from 'vue'

const tasks = ref([
  { left: "Fundament", right: "Færdig" },
  { left: "Råhus", right: "I gang" },
  { left: "Indvendigt", right: "Ikke startet" }
])
</script>


<template>
  <div class="project-status-container">
    <section class="tasks-section">
      <h2 class="tasks-title">Projektstatus</h2>
      <section class="tasks">
        <div 
          v-for="(task, index) in tasks" 
          :key="index" 
          class="task-row"
        >
          <span class="task-name">{{ task.left }}</span>
          <span class="task-status">{{ task.right }}</span>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.project-status-container{
  width: 100vw;
  padding: 0rem 2rem;
}
.tasks-section {
  width: 100%;
  margin: 2rem auto;
  color: $color-surface;

  .tasks-title {
    text-align: left;
    font-size: $font-size-headline-1;
    font-weight: bold;
    padding: 0.25rem 1rem;
    border-top-left-radius: $border-radius-small;
    border-top-right-radius: $border-radius-small;
    background-color: $color-primary;
    margin-bottom: 0.125rem;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    padding: 0rem 0rem;
    background-color: $color-primary;
    border-bottom-left-radius: $border-radius-small;
    border-bottom-right-radius: $border-radius-small;

    .task-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.875rem 0rem 0.875rem 0rem;
      margin: 0rem 1rem;
      font-size: $font-size-body;
      &:not(:last-child) {
        border-bottom: 1px dotted #fff;
      }
      .task-name {
        text-align: left;
      }

      .task-status {
        text-align: right;
      }
    }
  }
}
</style>