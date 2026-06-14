<script setup>
import { useBookings } from "@/composables/useBookings"
import { computed, onMounted, ref } from "vue"

import BookingSystem from "@/components/BookingSystem.vue"
import CalendarActivities from "@/components/CalendarActivities.vue"
import CalendarCards from "@/components/CalendarCards.vue"
import Calendar from "@/components/CalendarComponent.vue"

const {
  bookings,
  loadBookings,
  addBooking,
  removeBooking
} = useBookings()

onMounted(() => {
  loadBookings()
})

const selectedDate = ref(new Date())

const handleDateSelect = (date) => {
  selectedDate.value = date
}

const activitiesForSelectedDate = computed(() => {
  return bookings.value.filter(b =>
    b.date.toDateString() === selectedDate.value.toDateString()
  )
})
</script>

<template>
  <div class="calendar-admin">

    <div class="calendar-admin__left">
      <BookingSystem
      :bookings="bookings"
      @create="addBooking"
      @delete="removeBooking"
      />
    </div>

    <div class="calendar-admin__right">

        <Calendar
          :activities="bookings"
          @select-date="handleDateSelect"
        />

      <CalendarActivities
        :selectedDate="selectedDate"
        :activities="activitiesForSelectedDate"
      />

      <CalendarCards />

    </div>
  </div>
</template>

<style lang="scss">
.calendar-admin {
  display: flex;
  gap: 2rem;
  width: 100%;
  padding: 2rem;

  &__left {
    flex: 1;
    min-width: 320px;
    background: $color-surface;
    padding: 1.5rem;
    border-radius: $border-radius-small;
  }

  &__right {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    align-items: stretch;
    padding: 1.5rem;
    background: $color-secondary;
    border-radius: $border-radius-small;
  }
}
</style>