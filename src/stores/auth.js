/**
 * Handles authentication state and user profile data.
 *
 * @category stores
 * @namespace AuthStore
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { auth as firebaseAuth, db } from "@/firebase";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

/**
 * Pinia authentication store.
 *
 * @memberof AuthStore
 * @function useAuthStore
 * @returns {Object} Authentication store instance
 */
export const useAuthStore = defineStore("auth", () => {
  /**
   * Currently authenticated Firebase user.
   *
   * @memberof AuthStore
   * @type {Object|null}
   */
  const user = ref(null);

  /**
   * Current user profile data from Firestore.
   *
   * @memberof AuthStore
   * @type {Object|null}
   */
  const profile = ref(null);

  /**
   * Indicates whether authentication is initializing.
   *
   * @memberof AuthStore
   * @type {boolean}
   */
  const loading = ref(true);

  /**
   * Indicates whether a user is authenticated.
   *
   * @memberof AuthStore
   * @type {boolean}
   */
  const isAuthenticated = computed(() => !!user.value);

  /**
   * Indicates whether the authenticated user is a manager.
   *
   * @memberof AuthStore
   * @type {boolean}
   */
  const isManager = computed(
    () => profile.value?.role === "manager" || profile.value?.isManager === true
  );

  /**
   * Signs a user in using email and password authentication.
   *
   * @memberof AuthStore
   * @async
   * @function login
   *
   * @param {string} email User email address
   * @param {string} password User password
   *
   * @returns {Promise<void>}
   */
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    user.value = userCredential.user;

    await fetchUserProfile(userCredential.user.uid);
  }

  /**
   * Signs the current user out.
   *
   * @memberof AuthStore
   * @async
   * @function logout
   *
   * @returns {Promise<void>}
   */
  async function logout() {
    await signOut(firebaseAuth);

    user.value = null;
    profile.value = null;
  }

  /**
   * Fetches the authenticated user's profile
   * from Firestore.
   *
   * @memberof AuthStore
   * @async
   * @function fetchUserProfile
   *
   * @param {string} uid Firebase user ID
   *
   * @returns {Promise<void>}
   */
  async function fetchUserProfile(uid) {
    const docSnap = await getDoc(doc(db, "users", uid));

    if (docSnap.exists()) {
      profile.value = docSnap.data();
    }
  }

  /**
   * Initializes Firebase authentication state listener.
   *
   * Automatically updates the authenticated user
   * and loads the related profile document.
   *
   * @memberof AuthStore
   * @function initAuth
   */
  function initAuth() {
    onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;

        await fetchUserProfile(firebaseUser.uid);
      } else {
        user.value = null;
        profile.value = null;
      }

      loading.value = false;
    });
  }

  return {
    user,
    profile,
    loading,
    isAuthenticated,
    isManager,
    login,
    logout,
    initAuth
  };
});