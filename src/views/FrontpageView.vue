<script setup>
import { ref } from "vue"
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";
import LargeIconButton from "@/components/LargeIconButton.vue";
import DocumentIcon from "@/assets/icons/Dokumenter.svg?url";
import MatieralIcon from "@/assets/icons/Materialevalg.svg?url";
import DayUpdateIcon from "@/assets/icons/Dagsopdatering.svg?url";

import CalenderIcon from "@/assets/icons/Kalender.svg?url";

import ConstructionSiteImages from "@/components/ConstructionSiteImages.vue";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.js";

const city = ref("");
const country = ref("");
const postalCode = ref("");
const region = ref("");
const street = ref("");
const type = ref("");

async function getProjectInfo() {
  const querySnapshot = await getDocs(collection(db, "projects"));

  const projectInfo = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  if(!querySnapshot.empty){
    city.value = projectInfo[0].info.address.city;
    country.value = projectInfo[0].info.address.country;
    postalCode.value = projectInfo[0].info.address.postalCode;
    region.value = projectInfo[0].info.address.region;
    street.value = projectInfo[0].info.address.street;
    type.value = projectInfo[0].info.type;
  }

}

getProjectInfo();

const tasks = ref([])

tasks.value =  [
  { left: "Fundament", right: "Færdig" },
  { left: "Råhus", right: "I gang" },
  { left: "Indvendigt", right: "Ikke startet" }
]

</script>
<template>
    <HeadlineDesc
        title="Familien Milton"
        :text="`
        Type: ${type}
        Adresse: ${street}
        ${postalCode} ${city}`"
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