<script setup>
import MessageList from "@/components/MessageList.vue";
import MessageInput from "@/components/MessageInput.vue";
import { ref } from "vue";

const data = ref([
  {
    user: "user1",
    content: "Hej Kim, jeg kan se at der er kommet forsinkelse på råhuset :(",
    timestamp: "2026-04-20T14:55",
    status: "seen"
  },
  {
    user: "user2",
    content: `Hej Sebastian
Det er korrekt, der er desværre kommet en forsinkelse fra leverandøren.
Vi forventer dog at kunne fortsætte arbejdet på mandag.`,
    timestamp: "2026-04-20T15:10",
    status: "seen"
  },
  {
    user: "user1",
    content: "Tak for opdateringen. Påvirker det afleveringsdatoen?",
    timestamp: "2026-04-20T15:40",
    status: "seen"
  },
  {
    user: "user2",
    content: "Ikke umiddelbart. Jeg holder jer opdateret i dagsrapporten.",
    timestamp: "2026-04-20T16:08",
    status: "sent"
  }
]);

const user = "user1";

const message = ref("");

function sendMessage(text) {
  data.value.push({
    user: "user1",
    content: text,
    timestamp: Date.now(),
    status: "sent"
  });
}
</script>
<template>
  <MessageList :data="data" :user="user" />
  <MessageInput v-model="message" @send="sendMessage" />
</template>
