<script setup>
import CalendarActivities from "@/components/CalendarActivities.vue";
import CalendarCards from "@/components/CalendarCards.vue";
import Calendar from "@/components/CalendarComponent.vue";
import { computed, ref } from "vue";

const selectedDate = ref(new Date())
const handleDateSelect = (date) => {
  selectedDate.value = date
}

// Mock data to show cards working.
const allActivities = [
  {
    id: 1,
    title: "Deadline for ændring af Fliser",
    time: "16:00",
    date: new Date(2026, 3, 11) // always today
  },
  {
    id: 2,
    title: "Råhus startes idag",
    time: "06:00",
    date: new Date(2026, 3, 14)
  }
]

const activitiesForSelectedDate = computed(() => {
  return allActivities.filter(activity => {
    return activity.date.toDateString() === selectedDate.value.toDateString()
  })
})
</script>

<template>
  <div class="calendar__title">
    <h1 class="calendar__title-text">Kalender</h1>
  </div>

  <div id="calendar">
    <Calendar
    :selectedDate="selectedDate"
    :activities="allActivities"
    @select-date="handleDateSelect"
    />
  </div>

  <div id="calendarActivities">
    <CalendarActivities
    :selectedDate="selectedDate"
    :activities="activitiesForSelectedDate"
/>
  </div>

  <!-- <CheckupCard :title="..." :date="..." /> -->
  <div id="check-up">
    <CalendarCards />
  </div>
</template>

<style lang="scss" scoped>
.calendar__title{
  padding: 1rem 2.5rem;
  font-size: $font-size-headline-1;
  font-weight: 600;
}

#calendar{
  display: flex;
  justify-content: center;
}
</style>
