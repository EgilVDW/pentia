/**
 * Handles contact state and contact lookup
 * for the currently selected project.
 *
 * @category stores
 * @namespace ContactStore
 */

import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";

/**
 * Pinia contact store.
 *
 * @memberof ContactStore
 * @function useContactStore
 * @returns {Object} Contact store instance
 */
export const useContactStore = defineStore("contact", () => {
  const authStore = useAuthStore();
  const projectStore = useProjectStore();

  /**
   * Current contact data.
   *
   * @memberof ContactStore
   * @type {Object|null}
   */
  const contact = ref(null);

  /**
   * Indicates whether contact data is loading.
   *
   * @memberof ContactStore
   * @type {boolean}
   */
  const loading = ref(false);

  /**
   * Computed contact ID based on the current project
   * and authenticated user.
   *
   * @memberof ContactStore
   * @type {string|null}
   */
  const contactId = computed(() => {
    const project = projectStore.currentProject;
    const user = authStore.user;

    if (!project || !user) return null;

    if (user.uid === project.managerId.id) {
      return project.customerId.id;
    }

    if (user.uid === project.customerId.id) {
      return project.managerId.id;
    }

    return null;
  });

  /**
   * Fetches the current contact from Firestore.
   *
   * @memberof ContactStore
   * @async
   * @function fetchContact
   * @returns {Promise<void>}
   */
  async function fetchContact() {
    if (!contactId.value) {
      contact.value = null;
      return;
    }

    loading.value = true;

    try {
      const userDoc = await getDoc(doc(db, "users", contactId.value));

      if (userDoc.exists()) {
        contact.value = {
          id: userDoc.id,
          ...userDoc.data()
        };
      } else {
        contact.value = null;
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
      contact.value = null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Watches authentication and project changes
   * and refreshes the contact automatically.
   *
   * @memberof ContactStore
   */
  watch(
    () => [authStore.user, projectStore.currentProject],
    async () => {
      await fetchContact();
    },
    { immediate: true }
  );

  return {
    contact,
    contactId,
    loading,
    fetchContact
  };
});