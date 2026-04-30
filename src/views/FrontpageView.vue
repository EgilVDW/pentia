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

  const projectData = projectSnap.docs[0].data();

  project.value = projectData;


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

const tasks = computed(() => {
  const s = project.value?.status;
  if (!s) return [];

  return [
    { left: "Fundament", right: s.foundation },
    { left: "Råhus", right: s.shell },
    { left: "Indvendigt", right: s.interior }
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