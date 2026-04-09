<script setup>
import { ref } from 'vue'

const tasks = ref([
  { left: "Fundament", right: "Færdig" },
  { left: "Råhus", right: "I gang" },
  { left: "Indvendigt", right: "Ikke startet" }
])
</script>


<template>
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
</template>

<style lang="scss" scoped>
.tasks-section {
  width: 100vw;
  margin: 2rem auto;
  padding: 1rem;

  .tasks-title {
    margin-bottom: 1rem;
    margin-left: 1rem;
    text-align: left;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .task-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
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