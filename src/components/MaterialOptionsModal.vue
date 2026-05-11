<script setup>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, watch } from "vue";

const props = defineProps({
  open: Boolean,
  materialId: String,
  materialTitle: String
})

const emit = defineEmits(["close"])

const options = ref([])
const loading = ref(false)

const fetchOptions = async () => {
  if (!props.materialId) return

  loading.value = true

  try {
    const snapshot = await getDocs(
      collection(db, "materials", props.materialId, "options")
    )

    options.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error fetching options:", error)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      fetchOptions()
    }
  }
)
</script>

<template>
  <div
    v-if="open"
    class="modal-overlay"
    @click.self="emit('close')"
  >
    <div class="modal">
      <div class="modal__header">
        <h2>{{ materialTitle }}</h2>

        <button @click="emit('close')">
          ✕
        </button>
      </div>

      <div v-if="loading">
        Loading...
      </div>

      <div
        v-else
        class="modal__options"
      >
        <div
          v-for="option in options"
          :key="option.id"
          class="option-card"
        >
          {{ option.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal {
  background: $color-background;
  width: 600px;
  max-width: 90vw;
  border-radius: 12px;
  padding: 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__options {
    display: grid;
    gap: 12px;
    margin-top: 24px;
  }
}

.option-card {
  border: 1px solid $color-foreground;
  border-radius: $border-radius-large;
  padding: 16px;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>