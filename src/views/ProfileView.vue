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

const customer = ref(null);
const project = ref(null);
const manager = ref(null);
const notifications = ref([]);

const customerId = "FVyJCzaC2MGGqbDsDwsF";

onMounted(async () => {
  const customerRef = doc(db, "users", customerId);

  const projectQuery = query(
    collection(db, "projects"),
    where("customerId", "==", customerRef)
  );

  const [customerSnap, projectSnapshot] = await Promise.all([
    getDoc(customerRef),
    getDocs(projectQuery)
  ]);

  if (customerSnap.exists()) {
    customer.value = customerSnap.data();
  }

  if (projectSnapshot.empty) return;

  const projectSnap = projectSnapshot.docs[0];
  project.value = { id: projectSnap.id, ...projectSnap.data() };

  const notificationsRef = collection(
    db,
    "projects",
    project.value.id,
    "notifications"
  );

  const notificationsQuery = query(
    notificationsRef,
    orderBy("createdAt", "desc")
  );

  const [managerSnap, notificationsSnapshot] = await Promise.all([
    getDoc(project.value.managerId),
    getDocs(notificationsQuery)
  ]);

  if (managerSnap.exists()) {
    manager.value = managerSnap.data();
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
</script>
<template>
  <main class="profile-view">
    <Heading tag="h1" size="large">Profil</Heading>
    <ProfileCard
      v-if="customer"
      :avatar="customer.avatar"
      :name="`${customer.firstName} ${customer.lastName}`"
      :email="customer.email"
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
