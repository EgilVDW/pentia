<script setup>
/**
 * @module CalendarComponent
 */
//TODO: Consider moving into seperate js file for less clutter.
import Icon from "@/components/Icon.vue"
import { computed, ref } from "vue"

/**
 * Props definition for the calendar component.
 *
 * @typedef {Object} Activity
 * @property {Date} date - The date of the activity.
 *
 * @type {{ activities: Activity[] }}
 */
const props = defineProps({
  activities: {
    type: Array,
    default: () => []
  }
})

const today = new Date()
const selectedDate = ref(null)

const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const daysOfWeek = ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"]

/**
 * Emits event when a date is selected.
 *
 * @event select-date
 * @type {(event: "select-date", date: Date) => void}
 */
const emit = defineEmits(["select-date"])

/**
 * Get the number of days in a given month.
 *
 * @param {number} month - Month index (0-11).
 * @param {number} year - Full year (e.g., 2026).
 * @returns {number} Number of days in the month.
 */
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Get the first day of the month adjusted so Monday = 0.
 *
 * @param {number} month - Month index (0-11).
 * @param {number} year - Full year.
 * @returns {number} Index of first day (0 = Monday, 6 = Sunday).
 */
const getFirstDayOfMonth = (month, year) => {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // make Monday first
}

/**
 * Check if a given date has an associated activity.
 *
 * @param {Date|null} date
 * @returns {boolean} True if at least one activity exists on the date.
 */
const hasActivity = (date) => {
  if (!date) return false

  return props.activities.some(activity =>
    activity.date.toDateString() === date.toDateString()
  )
}

/**
 * Represents a single calendar day.
 *
 * @typedef {Object} CalendarDay
 * @property {Date|null} date - Actual date object (null for filler days).
 * @property {number} [day] - Day number of the month.
 * @property {boolean} isCurrentMonth - Whether the day belongs to the current month.
 * @property {boolean} [isToday] - Whether the day is today.
 * @property {boolean} [hasActivity] - Whether the day has an activity.
 */

/**
 * Computed list of days for the current calendar view.
 * Includes leading empty days to align the first weekday.
 *
 * @type {import('vue').ComputedRef<CalendarDay[]>}
 */
const calendarDays = computed(() => {
  const days = []
  const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value)
  const firstDay = getFirstDayOfMonth(currentMonth.value, currentYear.value)

  // previous month filler
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: null, isCurrentMonth: false })
  }

  // current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)

    days.push({
      date,
      day: i,
      isCurrentMonth: true,
      isToday:
        i === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear(),
      hasActivity: hasActivity(date)
    })
  }

  return days
})

const selectDate = (day) => {
  if (!day.date) return

  selectedDate.value = day.date
  emit("select-date", day.date)
}

const isSelected = (day) => {
  if (!day.date || !selectedDate.value) return false
  return day.date.toDateString() === selectedDate.value.toDateString()
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const monthLabel = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString("da-DK", {
    month: "long",
    year: "numeric"
  })
})
</script>

<template>
  <div class="calendar">
    <div class="calendar__header">
      <button class="calendar__nav" @click="prevMonth">
        <Icon class="calendar__nav--previous" name="Frem-tilbage-pil"/>
      </button>
      <div class="calendar__title">{{ monthLabel }}</div>
      <button class="calendar__nav" @click="nextMonth">
        <Icon class="calendar__nav--next" name="Frem-tilbage-pil"/>
      </button>
    </div>

    <div class="calendar__weekdays">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="calendar__weekday"
      >
        {{ day }}
      </div>
    </div>

    <div class="calendar__grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar__day"
        :class="{
          'calendar__day--inactive': !day.isCurrentMonth,
          'calendar__day--today': day.isToday,
          'calendar__day--selected': isSelected(day),
          'calendar__day--has-activity': day.hasActivity
        }"
        @click="selectDate(day)"
      >
        {{ day.day }}
      </div>
    </div>

    <div class="calendar__legend">
      <div class="calendar__legend-item">
        <span class="calendar__legend-box calendar__legend-box--info"></span>
        Tjek for information
      </div>
      <div class="calendar__legend-item">
        <span class="calendar__legend-box calendar__legend-box--selected"></span>
        Valgte dato
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  width: 350px;
  background: $color-surface;
  padding: 1rem;
  border-radius: $border-radius-small;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__title {
    text-transform: capitalize;
  }

  &__nav {
    background: none;
    border: none;
    color: $color-primary;
    cursor: pointer;
    font-size: 1.2rem;

    &--previous {
      height: 1.5rem;
    }

    &--next {
      height: 1.5rem;
      transform: rotate(180deg);
    }
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: $color-foreground;
  }

  &__weekday {
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  &__day {
    position: relative;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-small;
    cursor: pointer;

    &--has-activity {
      background: $color-primary;
      color: $color-surface;
    }

    &--inactive {
      color: #bbb;
    }

    &--today {
      color: $color-foreground;
      font-weight: bold;
    }

    &--selected {
      background: $color-highlight;
      color: $color-foreground;
    }
  }

  &__legend {
    display: flex;
    margin-top: 1rem;
    font-size: 0.75rem;
    gap: 1rem;
    padding-left: .75rem;
  }

  &__legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }

  &__legend-box {
    width: 10px;
    height: 10px;
    margin-right: 6px;

    &--info {
      background: $color-primary;
      border-radius: $border-radius-small;
    }

    &--selected {
      background: $color-highlight;
    }
  }
}
</style>
