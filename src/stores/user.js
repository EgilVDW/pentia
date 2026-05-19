// src/stores/userStore.js

import { defineStore } from "pinia";
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase";

export const useUserStore = defineStore("user", () => {
  const firebaseUser = ref(null);

  const user = ref(null);
  const project = ref(null);

  const projectId = ref(null);


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