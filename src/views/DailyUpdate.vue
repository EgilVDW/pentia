<script setup>
import MediumWhiteContainer from "@/components/MediumWhiteContainer.vue";
import DailyInfo from "@/components/DailyInfo.vue";
import TitleList from "@/components/TitleList.vue";
import DailyImages from "@/components/DailyImages.vue";
import NavigationButton from "@/components/NavigationButton.vue";
import ManagerComment from "@/components/ManagerComment.vue";
import Heading from "@/components/Heading.vue";
import { ref, onMounted, computed } from "vue";
import { doc, getDoc, collection, getDocs, query, where, limit, orderBy } from "firebase/firestore";
import { db } from "@/firebase";


const user = ref(null);
const project = ref(null);
const projectId = ref(null);
const manager = ref(null);
const latestUpdate = ref(null);

async function loadData(){
  const userId = "FVyJCzaC2MGGqbDsDwsF";

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

  const updateQuery = query(
    collection(db, "projects", projectId.value, "dailyUpdates"),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const updateSnap = await getDocs(updateQuery);
  latestUpdate.value = updateSnap.docs[0]?.data();

  const managerSnap = await getDoc(project.value.managerId);

  manager.value = managerSnap.data();
}

onMounted(loadData);

const dailyWork = ref([])
dailyWork.value = [
  "Fundament færdigstøbt",
  "Kloak tilsluttet",
  "Klargøring til råhus monteret"
];

const imageDB = ref([])
imageDB.value = [
  { path: "/images/images_bygherre/Dagsopdatering/Rectangle-64.png", date: "today" },
  { path: "/images/images_bygherre/Dagsopdatering/Rectangle-65.png", date: "today" },
  { path: "/images/images_bygherre/Dagsopdatering/Rectangle-66.png", date: "today" }
]

const commentDB = ref([])
commentDB.value = [
  {
    img: "/images/images_bygherre/Kim_profile_picture.png",
    name: "Kim Agerbæk",
    comment: "Fundamentet er nu færdigt. Vi forventer at starte råhusmontage i næste uge, hvis vejret holder.",
    time: "14:58"
  }
]

const pdf = ref([]);
pdf.value = [
  "Fundament_tegning.pdf",
  "Vejrforhold.pdf"
]

const formattedDate = computed(() => {
  return latestUpdate.value?.createdAt
    ? latestUpdate.value.createdAt.toDate().toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).replace(",", "")
    : "";
});

</script>
<template>
  <Heading tag="h1" size="large">Dagsopdatering</Heading>
  <MediumWhiteContainer>
    <DailyInfo :date="formattedDate" :constructionManager="manager?.firstName + ' ' + manager?.lastName" :project="project?.info?.name"/>
  </MediumWhiteContainer>
  <Heading tag="h2" size="medium">Dagens arbejde</Heading>
  <MediumWhiteContainer>
    <TitleList :items="dailyWork" />
  </MediumWhiteContainer>
  <Heading tag="h2" size="medium">Billeder fra dagen</Heading>
  <div class="image-container">
    <DailyImages
    class="image-container__image"
    v-for="(img, index) in imageDB"
    :key="index"
    :src="img.path"
    :date="img.date"
    />
  </div>
  <Heading tag="h2" size="medium">Kommentar</Heading>
  <MediumWhiteContainer>
    <ManagerComment :src="commentDB[0].img" :name="commentDB[0].name" :comment="commentDB[0].comment" :time="commentDB[0].time"/>
  </MediumWhiteContainer>
  <Heading tag="h2" size="medium">Vedhæftet filer</Heading>
  <div class="button-container">
    <NavigationButton :label="pdf[0]"/>
    <NavigationButton :label="pdf[1]"/>
  </div>
  <div class="button-container">
    <NavigationButton label="Forrige" iconLeft="Frem-tilbage-pil"/>
    <NavigationButton label="Næste" iconRight="Frem-tilbage-pil"/>
  </div>
</template>
<style scoped lang="scss">
.image-container{
  margin: 0.75rem 0rem 1.75rem 0rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  .image-container__image{
    border-radius: $border-radius-large;
    box-shadow: $drop-shadow;
  }
}
.button-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem;
  gap: 0.5rem;
}
</style>
