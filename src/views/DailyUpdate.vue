<script setup>
import MediumWhiteContainer from "@/components/MediumWhiteContainer.vue";
import DailyInfo from "@/components/DailyInfo.vue";
import TitleList from "@/components/TitleList.vue";
import DailyImages from "@/components/DailyImages.vue";
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
</script>
<template>
  <DailyInfo :date="currentDate" :constructionManager="manager" :project="project"/>
  <MediumWhiteContainer>
    <TitleList :items="dailyWork" />
  </MediumWhiteContainer>
  <div class="image-container">
    <DailyImages
    class="image-container__image"
    v-for="(img, index) in imageDB"
    :key="index"
    :src="img.path"
    :date="img.date"
    />
  </div>
</template>
<style scoped lang="scss">
.image-container{
  margin: 1rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  .image-container__image{
    border-radius: $border-radius-large;
    box-shadow: $drop-shadow;
  }
}

</style>
