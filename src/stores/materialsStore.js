// stores/materialsStore.js
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMaterialsStore = defineStore("materials", () => {
  const cards = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const completedSteps = computed(() => cards.value.filter(c => c.selected).length);
  const totalSteps = computed(() => cards.value.length);

  async function fetchMaterials() {
    if (cards.value.length) return;
    loading.value = true;
    error.value = null;

    try {
      const snapshot = await getDocs(collection(db, "materials"));
      cards.value = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.category || data.name || "Ukendt",
          image: data.image ?? null,
          selected: false
        };
      });
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  function toggleCard(id) {
    const card = cards.value.find(c => c.id === id);
    if (card) card.selected = !card.selected;
  }

  return { cards, loading, error, completedSteps, totalSteps, fetchMaterials, toggleCard };
});