import { defineStore } from "pinia";
import { ref } from "vue";
import { db, storage } from "@/firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

export const useProjectStore = defineStore("project", () => {
  const currentProject = ref(null);
  const loading = ref(false);

  const tasks = ref([]);
  const documents = ref([]);
  const calendar = ref([]);
  const images = ref([]);
  const messages = ref([]);
  const notifications = ref([]);

  async function fetchProject() {
    loading.value = true;
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      if (!querySnapshot.empty) {
        const projectDoc = querySnapshot.docs[0];
        currentProject.value = { id: projectDoc.id, ...projectDoc.data() };

        // Hent automatisk alle subcollections
        await fetchSubCollections(projectDoc.id);
      }
    } catch (error) {
      console.error("Fejl ved hentning af projekt:", error);
    } finally {
      loading.value = false;
    }
  }

  // Hjælper med at hente alle subcollections på én gang
  async function fetchSubCollections(projectId) {
    const pRef = doc(db, "projects", projectId);

    const [tasksSnap, docsSnap, calSnap, imgSnap, msgSnap, notifSnap] =
      await Promise.all([
        getDocs(collection(pRef, "tasks")),
        getDocs(collection(pRef, "documents")),
        getDocs(collection(pRef, "calendar")),
        getDocs(collection(pRef, "images")),
        getDocs(collection(pRef, "messages")),
        getDocs(collection(pRef, "notifications"))
      ]);

    tasks.value = tasksSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    documents.value = docsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    calendar.value = calSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    images.value = imgSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    messages.value = msgSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    notifications.value = notifSnap.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
  }

  // Uploader fil til Storage og gemmer linket i subcollection
  async function uploadProjectFile(file, subcollectionName) {
    if (!currentProject.value) return;

    try {
      // Opret sti i Firebase Storage
      const fileRef = storageRef(
        storage,
        `projects/${currentProject.value.id}/${subcollectionName}/${file.name}`
      );

      const uploadResult = await uploadBytes(fileRef, file);

      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Gemmer metadata og URL i den korrekte subcollection
      const docData = {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date(),
        size: file.size
      };

      const docRef = await addDoc(
        collection(db, "projects", currentProject.value.id, subcollectionName),
        docData
      );

      // Pusher det til lokal Pinia state med det samme
      if (subcollectionName === "documents")
        documents.value.push({ id: docRef.id, ...docData });
      if (subcollectionName === "images")
        images.value.push({ id: docRef.id, ...docData });
    } catch (error) {
      console.error(`Fejl ved upload til ${subcollectionName}:`, error);
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
