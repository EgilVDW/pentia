import { defineStore } from "pinia"
import { ref } from "vue"
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"

export const useMaterialsStore = defineStore("materials", () => {
  const materialsList = ref([])
  const loading = ref(false)

  async function fetchMaterials() {
    loading.value = true
    try {
      const querySnapshot = await getDocs(collection(db, "materials"))
      materialsList.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Fejl ved hentning af materialer:", error)
    } finally {
      loading.value = false
    }
  }

  return { materialsList, loading, fetchMaterials }
})