<script setup>
import ChatHeader from "@/components/ChatHeader.vue";
import MessageList from "@/components/MessageList.vue";
import MessageInput from "@/components/MessageInput.vue";

import { computed, onMounted, watch, ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";
import { useContactStore } from "@/stores/contact";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const contactStore = useContactStore();

const message = ref("");

const customerId = computed(() => authStore.user?.uid);

const manager = computed(() => contactStore.contact);
const messages = computed(() => projectStore.messages);

onMounted(async () => {
  if (!projectStore.currentProject) {
    await projectStore.fetchProject();
  }
});

watch(
  () => [authStore.user, projectStore.currentProject],
  async () => {
    if (projectStore.currentProject) {
      contactStore.subscribeToContact(projectStore.currentProject.managerId);
    }
  },
  { immediate: true }
);

async function sendMessage(content) {
  await projectStore.sendMessage({
    content,
    sender: customerId.value
  });

  message.value = "";
}

const getRole = (role) => {
  const map = {
    manager: "Byggeleder",
    customer: "Bygherre"
  };

  return map[role] ?? role;
};

const now = ref(Date.now());

setInterval(() => {
  now.value = Date.now();
}, 10000);

const isOnline = computed(() => {
  if (!manager.value?.lastActive) return false;

  const last =
    manager.value.lastActive.toMillis?.() ??
    new Date(manager.value.lastActive).getTime();

  return now.value - last < 60000;
});
</script>
<template>
  <main class="chat-view">
    <ChatHeader
      v-if="manager"
      :name="`${manager.firstName} ${manager.lastName}`"
      :role="getRole(manager.role)"
      :active="isOnline"
    />
    <div class="chat-view__chat">
      <MessageList :data="messages" :sender="customerId" />
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
