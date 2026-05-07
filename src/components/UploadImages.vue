<script setup>
import { onMounted, ref } from "vue";
import { doc, getDoc, collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase";

const props = defineProps({
  user: {
    type: String,
    required: true
  }
});

const selectedFiles = ref([]);
const storage = getStorage();
const projectId = ref(null);
const project = ref(null);

const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function handleFile(event) {
  const files = Array.from(event.target.files);
  selectedFiles.value = Array.from(event.target.files);

  if (files.length > MAX_FILES) {
    alert(`You can only upload up to ${MAX_FILES} images.`);
    return;
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      alert(`${file.name} exceeds 5 MB.`);
      return;
    }
  }
}



async function upload() {
  if (!selectedFiles.value.length) {
    console.log("No files selected");
    return;
  }

  try {
    const uploads = selectedFiles.value.map(async (file) => {
      const fileRef = storageRef(
        storage,
        `projects/${projectId.value}/images/${file.name}`
      );

      // Upload file
      await uploadBytes(fileRef, file);

      // Get URL
      const downloadURL = await getDownloadURL(fileRef);

      // Save metadata
      await addDoc(
        collection(db, "projects", projectId.value, "images"),
        {
          name: file.name,
          url: downloadURL,
          path: fileRef.fullPath,
          createdAt: serverTimestamp(),
          size: file.size,
          contentType: file.type
        }
      );
    });

    await Promise.all(uploads);

    console.log("All files uploaded!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}


async function loadData(){
  const userId = props.user;
  const userSnap = await getDoc(doc(db, "users", userId));
  if (!userSnap.exists()) return;

  const q = query(
    collection(db, "projects"),
    where("customerId", "==", doc(db, "users", userId))
  );

  const projectSnap = await getDocs(q);
  if (projectSnap.empty) return;

  const projectDoc = projectSnap.docs[0];

  project.value = {
    id: projectDoc.id,
    ...projectDoc.data()
  };

  projectId.value = projectDoc.id;
}

onMounted(() => loadData());
</script>

<template>
  <input type="file" multiple @change="handleFile" />
  <button class="upload-button" @click="upload">Upload</button>
</template>

<style scoped lang="scss">
.upload-button{
  border: 1px solid #000;
  background-color: #eee;
  padding: 0.25rem;
}
</style>