<script setup>
import MediumWhiteContainer from "@/components/MediumWhiteContainer.vue";
import DailyInfo from "@/components/DailyInfo.vue";
import TitleList from "@/components/TitleList.vue";
import DailyImages from "@/components/DailyImages.vue";
import NavigationButton from "@/components/NavigationButton.vue";
import ManagerComment from "@/components/ManagerComment.vue";
import Heading from "@/components/Heading.vue";
import { ref } from "vue";


const currentDate = new Date().toLocaleDateString();
const manager = "Kim Agerbæk";
const project = "Typehus A 145";

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
</script>
<template>
  <Heading tag="h1" size="large">Dagsopdatering</Heading>
  <MediumWhiteContainer>
    <DailyInfo :date="currentDate" :constructionManager="manager" :project="project"/>
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
