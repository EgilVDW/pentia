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

  const projectData = projectSnapshot.docs[0].data();
  const managerRef = projectData.managerId;

  const managerSnap = await getDoc(managerRef);

  if (managerSnap.exists()) {
    manager.value = managerSnap.data();
  }

  const conversationId = [customerId, managerRef.id].sort().join("_");

  const messagesQuery = query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc")
  );

  const messagesSnapshot = await getDocs(messagesQuery);

  messages.value = messagesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
});

const message = ref("");

const sendMessage = (text) => {
  messages.value.push({
    user: "user1",
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
      <MessageList v-if="messages" :data="messages" :user="customerId" />
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
