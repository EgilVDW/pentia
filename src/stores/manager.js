import { defineStore } from "pinia"
import { ref } from "vue"
import { db } from "@/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export const useManagerStore = defineStore("manager", () => {
  const managers = ref([])
  const loading = ref(false)

  async function fetchManagers() {
    loading.value = true
    try {
      // Henter brugere hvor role == 'manager'
      const q = query(collection(db, "users"), where("role", "==", "manager"))
      const querySnapshot = await getDocs(q)

      managers.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Fejl ved hentning af managere:", error)
    } finally {
      loading.value = false
    }
  }

  return { managers, loading, fetchManagers }
})