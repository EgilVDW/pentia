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

export const useUserStore = defineStore("user", () => {
  const firebaseUser = ref(null);
  const user = ref(null);
  const project = ref(null);
  const projectId = ref(null);

  async function loadData(userId) {
    try {
      console.log("login with ", userId);

      // USER
      const userRef = doc(db, "users", userId);
      console.log("get user ", userRef.path);

      const userSnap = await getDoc(userRef);
      console.log("User data ", userSnap.data());

      if (!userSnap.exists()) {
        user.value = null;
        return;
      }

      user.value = userSnap.data();

      // PROJECT
      const userDocRef = doc(db, "users", userId);

      const q = query(
        collection(db, "projects"),
        where("customerId", "==", userDocRef)
      );
      console.log("get project where customerId =", userDocRef.path);

      const projectSnap = await getDocs(q);


      projectSnap.docs.forEach((projectDoc) => {
        console.log("Project ", {
          id: projectDoc.id,
          ...projectDoc.data()
        });
      });

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

      console.log("Project stored ", project.value);
    } catch (err) {
      console.error("error", err);
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