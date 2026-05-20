/**
 * Handles material data from Firestore.
 *
 * @category stores
 * @namespace MaterialsStore
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

/**
 * Pinia store for materials.
 *
 * @memberof MaterialsStore
 * @function useMaterialsStore
 *
 * @returns {Object} Materials store instance
 */
export const useMaterialsStore = defineStore("materials", () => {
  /**
   * List of available materials.
   *
   * @memberof MaterialsStore
   * @type {Array}
   */
  const materialsList = ref([]);

  /**
   * Indicates whether materials are loading.
   *
   * @memberof MaterialsStore
   * @type {boolean}
   */
  const loading = ref(false);

  /**
   * Fetches materials from Firestore.
   *
   * @memberof MaterialsStore
   * @async
   * @function fetchMaterials
   *
   * @returns {Promise<void>}
   */
  async function fetchMaterials() {
    loading.value = true;

    try {
      const querySnapshot = await getDocs(
        collection(db, "materials")
      );

      materialsList.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(
        "Fejl ved hentning af materialer:",
        error
      );
    } finally {
      loading.value = false;
    }
  }

  return {
    materialsList,
    loading,
    fetchMaterials
  };
});