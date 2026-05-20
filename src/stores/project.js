/**
 * Handles project state, subcollections, and file uploads.
 *
 * @category stores
 * @namespace ProjectStore
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { db, storage } from "@/firebase";

import {
  collection,
  getDocs,
  addDoc,
  doc
} from "firebase/firestore";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

/**
 * Pinia store for project data and related subcollections.
 *
 * @memberof ProjectStore
 * @function useProjectStore
 *
 * @returns {Object} Project store instance
 */
export const useProjectStore = defineStore("project", () => {
  /**
   * Currently active project.
   *
   * @memberof ProjectStore
   * @type {Object|null}
   */
  const currentProject = ref(null);

  /**
   * Loading state for project data.
   *
   * @memberof ProjectStore
   * @type {boolean}
   */
  const loading = ref(false);

  /**
   * Project tasks.
   *
   * @memberof ProjectStore
   * @type {Array}
   */
  const tasks = ref([]);

  /**
   * Project documents.
   *
   * @memberof ProjectStore
   * @type {Array}
   */
  const documents = ref([]);

  /**
   * Project calendar events.
   *
   * @memberof ProjectStore
   * @type {Array}
   */
  const calendar = ref([]);

  /**
   * Project images.
   *
   * @memberof ProjectStore
   * @type {Array}
   */
  const images = ref([]);

  /**
   * Project messages.
   *
   * @memberof ProjectStore
   * @type {Array}
   */
  const messages = ref([]);

  /**
   * Project notifications.
   *
   * @memberof ProjectStore
   * @type {Array}
   */
  const notifications = ref([]);

  /**
   * Fetches the first available project and its subcollections.
   *
   * @memberof ProjectStore
   * @async
   * @function fetchProject
   *
   * @returns {Promise<void>}
   */
  async function fetchProject() {
    loading.value = true;

    try {
      const querySnapshot = await getDocs(collection(db, "projects"));

      if (!querySnapshot.empty) {
        const projectDoc = querySnapshot.docs[0];

        currentProject.value = {
          id: projectDoc.id,
          ...projectDoc.data()
        };

        await fetchSubCollections(projectDoc.id);
      }
    } catch (error) {
      console.error("Fejl ved hentning af projekt:", error);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Fetches all project subcollections in parallel.
   *
   * @memberof ProjectStore
   * @async
   * @function fetchSubCollections
   *
   * @param {string} projectId
   *
   * @returns {Promise<void>}
   */
  async function fetchSubCollections(projectId) {
    const pRef = doc(db, "projects", projectId);

    const [
      tasksSnap,
      docsSnap,
      calSnap,
      imgSnap,
      msgSnap,
      notifSnap
    ] = await Promise.all([
      getDocs(collection(pRef, "tasks")),
      getDocs(collection(pRef, "documents")),
      getDocs(collection(pRef, "calendar")),
      getDocs(collection(pRef, "images")),
      getDocs(collection(pRef, "messages")),
      getDocs(collection(pRef, "notifications"))
    ]);

    tasks.value = tasksSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    documents.value = docsSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    calendar.value = calSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    images.value = imgSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    messages.value = msgSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    notifications.value = notifSnap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
  }

  /**
   * Uploads a file to Firebase Storage and stores metadata
   * in the specified project subcollection.
   *
   * @memberof ProjectStore
   * @async
   * @function uploadProjectFile
   *
   * @param {File} file
   * @param {string} subcollectionName
   *
   * @returns {Promise<void>}
   */
  async function uploadProjectFile(file, subcollectionName) {
    if (!currentProject.value) return;

    try {
      const fileRef = storageRef(
        storage,
        `projects/${currentProject.value.id}/${subcollectionName}/${file.name}`
      );

      const uploadResult = await uploadBytes(fileRef, file);

      const downloadURL = await getDownloadURL(uploadResult.ref);

      const docData = {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date(),
        size: file.size
      };

      const docRef = await addDoc(
        collection(
          db,
          "projects",
          currentProject.value.id,
          subcollectionName
        ),
        docData
      );

      if (subcollectionName === "documents") {
        documents.value.push({ id: docRef.id, ...docData });
      }

      if (subcollectionName === "images") {
        images.value.push({ id: docRef.id, ...docData });
      }
    } catch (error) {
      console.error(
        `Fejl ved upload til ${subcollectionName}:`,
        error
      );
    }
  }

  return {
    currentProject,
    loading,
    tasks,
    documents,
    calendar,
    images,
    messages,
    notifications,
    fetchProject,
    uploadProjectFile
  };
});