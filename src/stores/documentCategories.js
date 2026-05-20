/**
 * Handles document category data from Firestore.
 *
 * @category stores
 * @namespace DocumentCategoriesStore
 */

import { defineStore } from "pinia"
import { ref } from "vue"
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"

/**
 * Pinia store for document categories.
 *
 * @memberof DocumentCategoriesStore
 * @function useDocumentCategoriesStore
 *
 * @returns {Object} Document categories store instance
 */

export const useDocumentCategoriesStore = defineStore("documentCategories", () => {
  /**
   * List of available document categories.
   *
   * @memberof DocumentCategoriesStore
   * @type {Array}
   */
  const categories = ref([])
  /**
   * Indicates whether categories are loading.
   *
   * @memberof DocumentCategoriesStore
   * @type {boolean}
   */

  const loading = ref(false)
  /**
   * Fetches document categories from Firestore.
   *
   * @memberof DocumentCategoriesStore
   * @async
   * @function fetchCategories
   *
   * @returns {Promise<void>}
   */

  async function fetchCategories() {
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