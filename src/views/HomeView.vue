<script setup>
import { onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getData() {
  const querySnapshot = await getDocs(collection(db, "test"));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}

onMounted(() => {
  getData();
});
</script>
<template>
  <h1>Hej</h1>
  <h2>Hej</h2>
  <p>Hej</p>
  <button>Hej</button>
  <ul>
    <li>Hej</li>
    <li>Hej</li>
    <li>Hej</li>
  </ul>
</template>
