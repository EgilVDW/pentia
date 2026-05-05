<script setup>
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";
import LargeIconButton from "@/components/LargeIconButton.vue";
import DocumentIcon from "@/assets/icons/Dokumenter.svg?url";
import MatieralIcon from "@/assets/icons/Materialevalg.svg?url";
import DayUpdateIcon from "@/assets/icons/Dagsopdatering.svg?url";
import CalenderIcon from "@/assets/icons/Kalender.svg?url";
import ConstructionSiteImages from "@/components/ConstructionSiteImages.vue";

import { ref, onMounted, computed } from "vue";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const selectedFile = ref(null);
const storage = getStorage();
const imageUrls = ref([]);
const projectId = ref(null);

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

async function getImages() {
  const folderRef = storageRef(storage, projectId.value + "/images/");
  const result = await listAll(folderRef);

  return result.items;
}

async function getImageURLs() {
  const items = await getImages();

  const urls = await Promise.all(
    items.map(item => getDownloadURL(item))
  );

  return urls;
}



const user = ref(null);
const project = ref(null);


async function loadData() {
  const userId = "FVyJCzaC2MGGqbDsDwsF";
  // const userId = auth.currentUser.uid;

  const userSnap = await getDoc(doc(db, "users", userId));
  if (!userSnap.exists()) return;

  user.value = userSnap.data();

  const q = query(
    collection(db, "projects"),
    where("customerId", "==", doc(db, "users", userId))
  );

  const projectSnap = await getDocs(q);
  if (projectSnap.empty) return;


  const projectDoc = projectSnap.docs[0];
  // const projectData = projectDoc.data();

  project.value = {
    id: projectDoc.id,
    ...projectDoc.data()
  };

  projectId.value = projectDoc.id;

  imageUrls.value = await getImageURLs();

}

onMounted(loadData);

const userName = computed(() => user.value?.firstName + " " + user.value?.lastName || "");

const addressText = computed(() => {
  const p = project.value?.info;
  if (!p) return "";

  const { type, address } = p;

  return `
    Type: ${type}
    Adresse: ${address.street}
    ${address.postalCode} ${address.city}
  `;
});

// project status map values
const taskMap = {
  done: "Færdig",
  inProgress: "Igang",
  pending: "Afventer"
}

// match map values
function mapValue(val) {
  return taskMap[val] ?? val;
}

// output project status values in array of objects
const tasks = computed(() => {
  const s = project.value?.status;
  if (!s) return [];

  return [
    { left: "Fundament", right: mapValue(s.foundation) },
    { left: "Råhus", right: mapValue(s.shell) },
    { left: "Indvendigt", right: mapValue(s.interior) }
  ];
});


</script>
<template>
    <input type="file" @change="handleFile" />
    <button @click="upload">Upload</button>
    <img v-for="url in imageUrls" :key="url" :src="url" />
    <HeadlineDesc
      :title="userName"
      :text="addressText"
    />
    <ProjectStatusList :items="tasks"/>
    <div class="button-wrap">
      <LargeIconButton :src="DocumentIcon" :size="28" text="Dokumenter"/>
      <LargeIconButton :src="MatieralIcon" :size="28" text="Materialevalg"/>
      <LargeIconButton :src="CalenderIcon" :size="28" text="Kalender"/>
      <LargeIconButton :src="DayUpdateIcon" :size="28" text="Dagsopdatering"/>
    </div>

    <ConstructionSiteImages :amount="2"/>
</template>

<style scoped lang="scss">
.button-wrap{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>