<script setup>
import Heading from "@/components/Heading.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Paragraph from "@/components/Paragraph.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import ContactCard from "@/components/ContactCard.vue";
import NotificationList from "@/components/NotificationList.vue";
import IconButton from "@/components/IconButton.vue";
import CenterButton from "@/components/CenterButton.vue";

const details = [
  {
    icon: "Forside",
    label: "Projekt",
    value: "Typehus: Vinkelhus A 145"
  },
  {
    icon: "Kort",
    label: "Adresse",
    value: "Holkenbjergvej 76"
  }
];

const notifications = [
  {
    content: "Nye dagsrapporter"
  },
  {
    content: "Nye billeder fra byggeplads"
  },
  {
    content: "Nye beskeder fra byggeleder"
  },
  {
    content: "Påmindelse om eftersyn"
  }
];
</script>
<template>
  <main class="profile-view">
    <Heading tag="h1" size="large">Profil</Heading>
    <ProfileCard
      avatar="/images/images_bygherre/Familien_milton_profile_picture.png"
      name="Familien Milton"
      email="Familienmilton@email.dk"
    />
    <div class="profile-view__group">
      <Paragraph
        >Følg dit byggeprojekt og modtag opdateringer fra din
        byggeleder</Paragraph
      >
      <DetailsCard :items="details" />
      <ContactCard
        avatar="/images/images_bygherre/Kim_profile_picture.png"
        role="Byggeleder"
        name="Kim Agerbæk"
        phoneNumber="+45 1234 5678"
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
