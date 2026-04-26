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
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: $border-radius-large;
  padding: 1rem;

  &__title {
    font-size: $font-size-headline-2;
    font-weight: 600;
    margin: 1rem 0 .5rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__empty {
  opacity: 0.6;
  font-size: 0.8rem;
}
}
</style>