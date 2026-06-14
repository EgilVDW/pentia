import { ref } from "vue"

const STORAGE_KEY = "calendarBookings"

const bookings = ref([])

const loadBookings = () => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {
    bookings.value = JSON.parse(saved).map(b => ({
      ...b,
      date: new Date(b.date)
    }))
  }
}

const saveBookings = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(bookings.value)
  )
}

const addBooking = (booking) => {
  bookings.value.push(booking)
  saveBookings()
}

const removeBooking = (id) => {
  bookings.value = bookings.value.filter(
    booking => booking.id !== id
  )

  saveBookings()
}

export function useBookings() {
  return {
    bookings,
    loadBookings,
    addBooking,
    removeBooking
  }
}