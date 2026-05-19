import { defineStore } from "pinia"
import { ref } from "vue"
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"

export const useDocumentCategoriesStore = defineStore("documentCategories", () => {
  const categories = ref([])
  const loading = ref(false)

  async function fetchCategories() {
    if (categories.value.length > 0) return

    loading.value = true
    try {
      const querySnapshot = await getDocs(collection(db, "documentCategories"))
      categories.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Fejl ved hentning af dokumentkategorier:", error)
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, fetchCategories }
})