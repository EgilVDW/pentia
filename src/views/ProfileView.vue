<script setup>
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
    value: "Typehus: Vinkelhus A 145",
  },
  {
    icon: "Kort",
    label: "Adresse",
    value: "Holkenbjergvej 76",
  },
];

const notifications = [
  {
    content: "Nye dagsrapporter",
  },
  {
    content: "Nye billeder fra byggeplads",
  },
  {
    content: "Nye beskeder fra byggeleder",
  },
  {
    content: "Påmindelse om eftersyn",
  },
];
</script>
<template>
  <ProfileCard
    avatar="/images/images_bygherre/Familien_milton_profile_picture.png"
    name="Familien Milton"
    email="Familienmilton@email.dk"
  />
  <Paragraph
    >Følg dit byggeprojekt og modtag opdateringer fra din byggeleder</Paragraph
  >
  <DetailsCard :items="details" />
  <ContactCard
    avatar="/images/images_bygherre/Kim_profile_picture.png"
    role="Byggeleder"
    name="Kim Agerbæk"
    phoneNumber="+45 1234 5678"
  />
  <NotificationList :items="notifications" />
  <IconButton icon="Indstillinger">Indstillinger</IconButton>
  <CenterButton>Log ud</CenterButton>
</template>
