<script setup>
import CalendarActivities from "@/components/CalendarActivities.vue";
import CalendarCards from "@/components/CalendarCards.vue";
import Calendar from "@/components/CalendarComponent.vue";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";

const projectId = "ovx2NQL4Bg8hT4PiTK6M"

onMounted(() => {
  onSnapshot(
    collection(db, "projects", projectId, "calendar"),
    snapshot => {
      activities.value = snapshot.docs.map(doc => {
        const data = doc.data()

        return {
          id: doc.id,
          title: data.title,
          link: data.link,
          date: data.datetime.toDate()
        }
      })
    }
  )
})

const activities = ref([])

const selectedDate = ref(new Date())
const handleDateSelect = (date) => {
  selectedDate.value = date
}

const activitiesForSelectedDate = computed(() => {
  return activities.value.filter(activity => {
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
