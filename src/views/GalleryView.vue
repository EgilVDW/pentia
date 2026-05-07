<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import ConstructionGallery from "@/components/ConstructionGallery.vue";

const route = useRoute();
const photos = ref([]);
const isLoading = ref(true);

const fetchPhotos = async () => {
  const projectId = route.params.id || "ovx2NQL4Bg8hT4PiTK6M";
  isLoading.value = true;
  try {

    const imagesRef = collection(
      db,
      "projects",
      projectId,
      "images"
    );
    const querySnapshot = await getDocs(imagesRef);
    if (querySnapshot.empty) {
      photos.value = [];
      return;
    }

    photos.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        url: data.path,
        date: data.createdAt?.toDate().toLocaleDateString("da-DK") || "Ingen dato"
      };
    });

  } catch (error) {
    console.error("eror getting images:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPhotos();
});
</script>

<template>
  <div class="gallery-view">
    <h1><strong>Byggeplads billeder</strong></h1>
    <div v-if="isLoading">Henter billeder...</div>

    <ConstructionGallery v-else :photos="photos" />
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  padding: 40px 20px;
  background-color: $color-secondary;
  min-height: 100vh;
  box-sizing: border-box;

  h1{
    color: $color-foreground;
    font-size: $font-size-headline-1;
    margin-bottom: 10px;
    padding-left: 5px;
    text-transform: none;
  }
}
</style>