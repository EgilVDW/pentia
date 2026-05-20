/**
 * Handles manager user data from Firestore.
 *
 * @category stores
 * @namespace ManagerStore
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/firebase";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

/**
 * Pinia store for manager users.
 *
 * @memberof ManagerStore
 * @function useManagerStore
 *
 * @returns {Object} Manager store instance
 */
export const useManagerStore = defineStore("manager", () => {
  /**
   * List of manager users.
   *
   * @memberof ManagerStore
   * @type {Array}
   */
  const managers = ref([]);

  /**
   * Indicates whether managers are loading.
   *
   * @memberof ManagerStore
   * @type {boolean}
   */
  const loading = ref(false);

  /**
   * Fetches all users with the manager role
   * from Firestore.
   *
   * @memberof ManagerStore
   * @async
   * @function fetchManagers
   *
   * @returns {Promise<void>}
   */
  async function fetchManagers() {
    loading.value = true;

    try {
      /**
       * Firestore query for manager users.
       */
      const q = query(
        collection(db, "users"),
        where("role", "==", "manager")
      );

      const querySnapshot = await getDocs(q);

      managers.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error(
        "Fejl ved hentning af managere:",
        error
      );
    } finally {
      loading.value = false;
    }
  }

  return {
    managers,
    loading,
    fetchManagers
  };
});