<script setup>
import ChatHeader from "@/components/ChatHeader.vue";
import MessageList from "@/components/MessageList.vue";
import MessageInput from "@/components/MessageInput.vue";
import { ref, onMounted } from "vue";
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
const manager = ref(null);

const customerId = "FVyJCzaC2MGGqbDsDwsF";

const messages = ref([]);

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
  }

  const projectDoc = projectSnapshot.docs[0];
  if (!projectDoc) return;

  const [managerSnapshot, messagesSnapshot] = await Promise.all([
    getDoc(projectDoc.data().managerId),
    getDocs(
      query(
        collection(db, "projects", projectDoc.id, "messages"),
        orderBy("createdAt", "asc")
      )
    )
  ]);

  if (managerSnapshot.exists()) {
    manager.value = managerSnapshot.data();
  }

  messages.value = messagesSnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
});

const message = ref("");

const sendMessage = (text) => {
  messages.value.push({
    sender: {
      id: customerId
    },
    content: text,
    timestamp: Date.now(),
    status: "sent"
  });
};

const getRole = (role) => {
  const map = {
    manager: "Byggeleder"
  };

  return map[role] ?? role;
};
</script>
<template>
  <main class="chat-view">
    <ChatHeader
      v-if="manager"
      :name="`${manager.firstName} ${manager.lastName}`"
      :role="getRole(manager.role)"
      :active="manager.isActive"
    />
    <div class="chat-view__chat">
      <MessageList v-if="messages" :data="messages" :sender="customerId" />
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
