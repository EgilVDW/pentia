<script setup>
import DayUpdateIcon from "@/assets/icons/Dagsopdatering.svg?url";
import DocumentIcon from "@/assets/icons/Dokumenter.svg?url";
import CalenderIcon from "@/assets/icons/Kalender.svg?url";
import MatieralIcon from "@/assets/icons/Materialevalg.svg?url";
import ConstructionSiteImages from "@/components/ConstructionSiteImages.vue";
import LargeIconButton from "@/components/LargeIconButton.vue";
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";

import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getStorage, listAll, ref as storageRef } from "firebase/storage";
import { computed, onMounted, ref } from "vue";

const storage = getStorage();
const projectId = ref(null);

const amountOfImages = ref(0);
async function getImages() {
  const folderRef = storageRef(storage, "projects/" + projectId.value + "/images/");
  const result = await listAll(folderRef);
  amountOfImages.value = result.items.length;
}

const user = ref(null);
const project = ref(null);

async function loadData(userId) {
  // const userId = "FVyJCzaC2MGGqbDsDwsF";

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

  project.value = {
    id: projectDoc.id,
    ...projectDoc.data()
  };

  projectId.value = projectDoc.id;

  getImages();
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return;

    loadData(user.uid);
  });
});

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
    <HeadlineDesc
      :title="userName"
      :text="addressText"
    />

    <ProjectStatusList :items="tasks"/>
    <div class="button-wrap">
      <LargeIconButton
        href="/documents"
        :src="DocumentIcon"
        :size="28"
        text="Dokumenter"
      />

      <LargeIconButton
        href="/materials"
        :src="MatieralIcon"
        :size="28"
        text="Materialevalg"
      />

      <LargeIconButton
        href="/calendar"
        :src="CalenderIcon"
        :size="28"
        text="Kalender"
      />

      <LargeIconButton
        href="/dailyupdate"
        :src="DayUpdateIcon"
        :size="28"
        text="Dagsopdatering"
      />
    </div>

    <ConstructionSiteImages href="/gallery" :amount="amountOfImages"/>
</template>

<style scoped lang="scss">
.button-wrap{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>