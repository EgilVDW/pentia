<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "@/firebase";

const user = ref(null);
const projects = ref([]);

const userId = "B0PrYXmWmZ0Q09DRJI6V";

onMounted(async () => {
  const userRef = doc(db, "users", userId);

  const [userSnapshot, projectSnapshot] = await Promise.all([
    getDoc(userRef),
    getDocs(
      query(collection(db, "projects"), where("managerId", "==", userRef))
    )
  ]);

  if (userSnapshot.exists()) {
    user.value = userSnapshot.data();
  }

  projects.value = projectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
});
</script>
<template>
  <main>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <RouterLink :to="`/desktop/${project.id}`">
          {{ project.info.address.street }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
