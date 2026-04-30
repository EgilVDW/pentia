<script setup>
import CalendarActivities from "@/components/CalendarActivities.vue";
import CalendarCards from "@/components/CalendarCards.vue";
import Calendar from "@/components/CalendarComponent.vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";

const activities = ref([])

const fetchActivities = async () => {
  const querySnapshot = await getDocs(collection(db, "activities"))

  activities.value = querySnapshot.docs.map(doc => {
    const data = doc.data()

    return {
      id: doc.id,
      ...data,
      date: data.date.toDate()
    }
  })
}

onMounted(fetchActivities)

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
    date: new Date(2026, 3, 11)
  }
  // {
  //   id: 2,
  //   title: "Råhus startes idag",
  //   time: "06:00",
  //   date: new Date(2026, 3, 14)
  // }
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
    :activities="activities"
    @select-date="handleDateSelect"
    />
  </div>

  <div id="calendarActivities">
    <CalendarActivities
    :selectedDate="selectedDate"
    :activities="activitiesForSelectedDate"
/>
  </div>

  <div id="check-up">
    <CalendarCards />
  </div>
</template>

<style lang="scss" scoped>
.calendar__title{
  padding: 1rem ;
  font-size: $font-size-headline-1;
  font-weight: 600;
}

#calendar{
  display: flex;
  justify-content: center;
}
</style>
