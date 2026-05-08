<script setup>
import Heading from "@/components/Heading.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Paragraph from "@/components/Paragraph.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import ContactCard from "@/components/ContactCard.vue";
import NotificationList from "@/components/NotificationList.vue";
import IconButton from "@/components/IconButton.vue";
import CenterButton from "@/components/CenterButton.vue";

import { ref, onMounted, computed } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy
} from "firebase/firestore";
import { db } from "@/firebase";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes
} from "firebase/storage";
import { updateDoc } from "firebase/firestore";

const customer = ref(null);
const project = ref(null);
const manager = ref(null);
const notifications = ref([]);

const storage = getStorage();

const customerId = "FVyJCzaC2MGGqbDsDwsF";

onMounted(async () => {
  const customerRef = doc(db, "users", customerId);

  const [customerSnapshot, projectSnapshot] = await Promise.all([
    getDoc(customerRef),
    getDocs(
      query(collection(db, "projects"), where("customerId", "==", customerRef))
    )
  ]);

  if (customerSnapshot.exists()) {
    customer.value = customerSnapshot.data();

    if (customer.value.avatarPath) {
      try {
        const avatarRef = storageRef(storage, customer.value.avatarPath);
        customer.value.avatar = await getDownloadURL(avatarRef);
      } catch {
        return null;
      }
    }
  }

  const projectDoc = projectSnapshot.docs[0];
  if (!projectDoc) return;

  project.value = { id: projectDoc.id, ...projectDoc.data() };

  const [managerSnapshot, notificationsSnapshot] = await Promise.all([
    getDoc(project.value.managerId),
    getDocs(
      query(
        collection(db, "projects", projectDoc.id, "notifications"),
        orderBy("createdAt", "desc")
      )
    )
  ]);

  if (managerSnapshot.exists()) {
    manager.value = managerSnapshot.data();

    if (manager.value.avatarPath) {
      try {
        const avatarRef = storageRef(storage, manager.value.avatarPath);
        manager.value.avatar = await getDownloadURL(avatarRef);
      } catch {
        return null;
      }
    }
  }

  notifications.value = notificationsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
});

const details = computed(() => [
  {
    icon: "Forside",
    label: "Projekt",
    value: project.value?.info?.type || ""
  },
  {
    icon: "Kort",
    label: "Adresse",
    value: project.value?.info?.address.street || ""
  }
]);

async function updateAvatar(file) {
  if (!customer.value) return;

  try {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const sanitizedFileName = file.name.replace(/\s+/g, "_");

    const path = `users/${customerId}/${sanitizedFileName}`;

    const avatarStorageRef = storageRef(storage, path);

    await uploadBytes(avatarStorageRef, file);

    const downloadURL = await getDownloadURL(avatarStorageRef);

    await updateDoc(doc(db, "users", customerId), {
      avatarPath: path
    });

    customer.value.avatar = `${downloadURL}?t=${Date.now()}`;
    customer.value.avatarPath = path;
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
      :avatar="customer.avatar"
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
        :avatar="manager.avatar"
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
