import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";

/**
 * Add two numbers.
 *
 * @category stores
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const useContactStore = defineStore("contact", () => {
  const authStore = useAuthStore();
  const projectStore = useProjectStore();

  const contact = ref(null);
  const loading = ref(false);

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
