<script setup>
import Heading from "@/components/Heading.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Paragraph from "@/components/Paragraph.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import ContactCard from "@/components/ContactCard.vue";
import NotificationList from "@/components/NotificationList.vue";
import IconButton from "@/components/IconButton.vue";
import CenterButton from "@/components/CenterButton.vue";

import { computed, onMounted, watch } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";
import { useContactStore } from "@/stores/contact";

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes
} from "firebase/storage";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const contactStore = useContactStore();

const storage = getStorage();

const customer = computed(() => authStore.profile);
const project = computed(() => projectStore.currentProject);
const manager = computed(() => contactStore.contact);
const notifications = computed(() => projectStore.notifications);

onMounted(async () => {
  if (!projectStore.currentProject) {
    await projectStore.fetchProject();
  }
});

watch(
  () => [authStore.user, projectStore.currentProject],
  async () => {
    await contactStore.fetchContact();
  },
  { immediate: true }
);

const details = computed(() => [
  {
    icon: "Forside",
    label: "Projekt",
    value: project.value?.info?.type || ""
  },
  {
    icon: "Kort",
    label: "Adresse",
    value: project.value?.info?.address?.street || ""
  }
]);

async function updateAvatar(file, size = 256) {
  if (!customer.value || !authStore.user) return;

  const customerId = authStore.user.uid;

  try {
    if (!file.type.startsWith("image/")) return;

    const webpBlob = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);

        canvas.toBlob(
          (blob) => {
            if (!blob) reject(new Error("Conversion failed"));
            else resolve(blob);
          },
          "image/webp",
          0.8
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

    const path = `users/${customerId}/avatar.webp`;
    const avatarStorageRef = storageRef(storage, path);

    await uploadBytes(avatarStorageRef, webpBlob, {
      contentType: "image/webp"
    });

    const downloadURL = await getDownloadURL(avatarStorageRef);

    await updateDoc(doc(db, "users", customerId), {
      avatarPath: path,
      avatarUrl: downloadURL
    });

    customer.value.avatar = `${downloadURL}?t=${Date.now()}`;
    customer.value.avatarPath = path;
    customer.value.avatarUrl = downloadURL;
  } catch {
    return null;
  }
}
</script>
<template>
  <main class="profile-view">
    <Heading tag="h1" size="large">Profil</Heading>
    <ProfileCard
      v-if="customer"
      :avatar="customer.avatarUrl"
      :name="`${customer.firstName} ${customer.lastName}`"
      :email="customer.email"
      @avatar-selected="updateAvatar"
    />
    <div class="profile-view__group">
      <Paragraph
        >Følg dit byggeprojekt og modtag opdateringer fra din
        byggeleder</Paragraph
      >
      <DetailsCard :items="details" />
      <ContactCard
        v-if="manager"
        :avatar="manager.avatarUrl"
        :name="`${manager.firstName} ${manager.lastName}`"
        :email="manager.email"
        :phoneNumber="manager?.phoneNumber"
      />
    </div>
    <div class="profile-view__group">
      <Heading tag="h2" size="medium">Notifikationer</Heading>
      <NotificationList :items="notifications" />
    </div>
    <div class="profile-view__button-grid">
      <div class="profile-view__group">
        <Heading tag="h2" size="medium">Min konto</Heading>
        <ul class="profile-view__group">
          <li>
            <IconButton icon="Adgangskode">Skift adgangskode</IconButton>
          </li>
          <li>
            <IconButton icon="Indstillinger">Indstillinger</IconButton>
          </li>
        </ul>
      </div>
      <div class="profile-view__group">
        <Heading tag="h2" size="medium">Support</Heading>
        <ul class="profile-view__group">
          <li>
            <IconButton icon="Opkald">Kontakt Milton Huse</IconButton>
          </li>
          <li>
            <IconButton icon="Hjaelp">Hjælp til app</IconButton>
          </li>
        </ul>
      </div>
    </div>
    <CenterButton>Log ud</CenterButton>
  </main>
</template>
<style scoped lang="scss">
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__button-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}
</style>
