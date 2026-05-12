# Calendar Component

## Props

### activities
Array of activity objects.

Each activity should contain:

- `date` (`Date`) — the activity date.

---

## State

### selectedDate
Currently selected date.

### currentMonth
Current visible month.

### currentYear
Current visible year.

---

## Methods

### getDaysInMonth(month, year)
Returns the number of days in the given month.

### getFirstDayOfMonth(month, year)
Returns the first day of the month with Monday as the first weekday.

### hasActivity(date)
Checks whether a given date has an activity.

### selectDate(day)
Selects a date and emits `select-date`.

### isSelected(day)
Checks whether a day is currently selected.

### prevMonth()
Navigates to previous month.

### nextMonth()
Navigates to next month.

---

## Computed

### calendarDays
Returns the visible calendar day objects.

### monthLabel
Returns the localized month label.