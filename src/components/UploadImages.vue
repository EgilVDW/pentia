<script setup>
import { onMounted, ref } from "vue";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { db } from "@/firebase";

const props = defineProps({
  user: {
    type: String,
    required: true
  }
});

const selectedFile = ref(null);
const storage = getStorage();
const projectId = ref(null);
const project = ref(null);


function handleFile(event) {
  selectedFile.value = event.target.files[0];
}

function upload() {
  if (!selectedFile.value) {
    console.log("No file selected");
    return;
  }
  const fileRef = storageRef(storage, projectId.value + "/images/" + selectedFile.value.name);

  uploadBytes(fileRef, selectedFile.value).then(() => {
    console.log("Uploaded!");
  });
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
  <input type="file" @change="handleFile" />
  <button class="upload-button" @click="upload">Upload</button>
</template>

<style scoped lang="scss">
.upload-button{
  border: 1px solid #000;
  background-color: #eee;
  padding: 0.25rem;
}
</style>