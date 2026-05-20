/**
 * Handles authenticated user state, user profile data,
 * and the user's associated project.
 *
 * @category stores
 * @namespace UserStore
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { auth, db } from "@/firebase";

/**
 * Pinia store for managing authenticated user data
 * and related project information.
 *
 * @memberof UserStore
 * @function useUserStore
 *
 * @returns {Object} User store instance
 */
export const useUserStore = defineStore("user", () => {
  /**
   * Raw Firebase authenticated user.
   *
   * @memberof UserStore
   * @type {Object|null}
   */
  const firebaseUser = ref(null);

  /**
   * Application user profile data from Firestore.
   *
   * @memberof UserStore
   * @type {Object|null}
   */
  const user = ref(null);

  /**
   * Project associated with the user.
   *
   * @memberof UserStore
   * @type {Object|null}
   */
  const project = ref(null);

  /**
   * ID of the user's project.
   *
   * @memberof UserStore
   * @type {string|null}
   */
  const projectId = ref(null);

  /**
   * Loads user profile and associated project data
   * from Firestore.
   *
   * @memberof UserStore
   * @async
   * @function loadData
   *
   * @param {string} userId Firebase user UID
   *
   * @returns {Promise<void>}
   */
  async function loadData(userId) {
    try {
      // USER
      const userSnap = await getDoc(doc(db, "users", userId));

      if (!userSnap.exists()) {
        user.value = null;
        return;
      }

      user.value = userSnap.data();

      // PROJECT
      const q = query(
        collection(db, "projects"),
        where("customerId", "==", doc(db, "users", userId))
      );

      const projectSnap = await getDocs(q);

      if (projectSnap.empty) {
        project.value = null;
        return;
      }

      const projectDoc = projectSnap.docs[0];

      project.value = {
        id: projectDoc.id,
        ...projectDoc.data()
      };

      projectId.value = projectDoc.id;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Initializes Firebase authentication listener.
   *
   * Updates store state whenever auth state changes.
   *
   * @memberof UserStore
   * @function initAuth
   */
  function initAuth() {
    onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        firebaseUser.value = null;
        user.value = null;
        project.value = null;
        return;
      }

      firebaseUser.value = authUser;

      await loadData(authUser.uid);
    });
  }

  return {
    firebaseUser,
    user,
    project,
    projectId,
    loadData,
    initAuth
  };
});