<script setup>
import ChatHeader from "@/components/ChatHeader.vue";
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

const message = ref("");

const sendMessage = (text) => {
  data.value.push({
    user: "user1",
    content: text,
    timestamp: Date.now(),
    status: "sent"
  });
};
</script>
<template>
  <main class="chat-view">
    <ChatHeader name="Kim Agerbæk" role="Byggeleder" status="online" />
    <div class="chat-view__chat">
      <MessageList :data="data" user="user1" />
      <MessageInput v-model="message" @send="sendMessage" />
    </div>
  </main>
</template>
<style scoped lang="scss">
.chat-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__chat {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1.5rem;
  }
}
</style>
