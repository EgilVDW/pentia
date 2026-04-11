<script setup>
import ActivitiesCard from "@/components/ActivitiesCard.vue"
import { computed } from "vue"

const props = defineProps({
  selectedDate: Date,
  activities: Array
})

const formattedDate = computed(() => {
  return props.selectedDate.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long"
  })
})
</script>

<template>
  <section class="activities">
    <h2 class="activities__title">
      Aktiviteter {{ formattedDate }}
    </h2>

    <p v-if="!activities.length" class="activities__empty">
      Ingen aktiviteter
    </p>

    <div class="activities__list">
      <ActivitiesCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.activities {
  padding: 1rem;
  background: #eae8e7;
  border-radius: 8px;

  &__title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__empty {
  opacity: 0.6;
  font-size: 0.9rem;
}
}
</style>