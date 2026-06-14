<script setup>
import { ref } from "vue"

const props = defineProps({
  bookings: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  "create",
  "delete"
])

const title = ref("")
const description = ref("")
const date = ref("")
const time = ref("")

const submit = () => {
  if (!title.value || !date.value || !time.value) return

  const booking = {
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    date: new Date(`${date.value}T${time.value}`)
  }

  emit("create", booking)

  title.value = ""
  description.value = ""
  date.value = ""
  time.value = ""
}
</script>

<template>
  <div class="booking">
    <h2>Opret aktivitet</h2>

    <input v-model="title" placeholder="Titel" />
    <textarea v-model="description" placeholder="Beskrivelse" />
    <input type="date" v-model="date" />
    <input type="time" v-model="time" />

    <button @click="submit">Opret</button>

    <div class="booking__list">
      <h3>Aktiviteter</h3>

      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking__item"
      >
        <div class="booking__item-header">
          <strong>{{ booking.title }}</strong>

          <button
            class="booking__delete"
            @click="emit('delete', booking.id)"
          >
            ✕
          </button>
        </div>

        <p>{{ booking.description }}</p>

        <small>
          {{ booking.date.toLocaleString("da-DK") }}
        </small>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .booking {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking h2 {
  margin-bottom: 0.5rem;
}

/* Inputs */
.booking input,
.booking textarea {
  padding: 0.75rem;
  border-radius: $border-radius-small;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  background: #fff;
}

/* Textarea sizing */
.booking textarea {
  min-height: 100px;
  resize: vertical;
}

/* Button */
.booking button {
  padding: 0.75rem 1rem;
  border: none;
  background: $color-primary;
  color: $color-surface;
  border-radius: $border-radius-small;
  cursor: pointer;
  width: fit-content;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}

.booking__list {
  margin-top: 2rem;
}

.booking__item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: $border-radius-small;
  margin-bottom: 1rem;
}

.booking__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.booking__delete {
  background: transparent !important;
  border: none;
  color: #c62828 !important;
  cursor: pointer;
  padding: 0.25rem 0.5rem !important;
  font-size: 1rem;
  width: auto !important;

  &:hover {
    opacity: 0.7;
  }
}
</style>