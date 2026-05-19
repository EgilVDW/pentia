<script setup>
import DayUpdateIcon from "@/assets/icons/Dagsopdatering.svg?url";
import DocumentIcon from "@/assets/icons/Dokumenter.svg?url";
import CalenderIcon from "@/assets/icons/Kalender.svg?url";
import MatieralIcon from "@/assets/icons/Materialevalg.svg?url";
import ConstructionSiteImages from "@/components/ConstructionSiteImages.vue";
import LargeIconButton from "@/components/LargeIconButton.vue";
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";

import { getStorage, listAll, ref as storageRef } from "firebase/storage";
import { computed, ref, watch } from "vue";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";


const userStore = useUserStore();
const {
  user,
  project,
  projectId
} = storeToRefs(userStore);

const storage = getStorage();


// IMAGES
const amountOfImages = ref(0);

async function getImages() {
  if (!projectId.value) return;

  const folderRef = storageRef(
    storage,
    `projects/${projectId.value}/images/`
  );

  const result = await listAll(folderRef);

  amountOfImages.value = result.items.length;
}


// WATCH FOR PROJECT CHANGES
watch(projectId, (newId) => {
  if (newId) {
    getImages();
  }
}, { immediate: true });



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