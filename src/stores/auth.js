import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { auth as firebaseAuth, db } from "@/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const profile = ref(null);
  const loading = ref(true);

  const isAuthenticated = computed(() => !!user.value);
  const isManager = computed(
    () => profile.value?.role === "manager" || profile.value?.isManager === true
  );

  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    user.value = userCredential.user;
    await fetchUserProfile(userCredential.user.uid);
  }

  async function logout() {
    await signOut(firebaseAuth);
    user.value = null;
    profile.value = null;
  }

  async function fetchUserProfile(uid) {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      profile.value = docSnap.data();
    }
  }

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
