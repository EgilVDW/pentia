<script setup>
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { onMounted, ref } from "vue";

const user = ref(null);
const projects = ref([]);

const userId = "8Kk7GiihG1W2fFbyN5tSJLZovsT2";

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
