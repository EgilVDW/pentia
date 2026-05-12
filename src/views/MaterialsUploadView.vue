<script setup>
import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { ref } from "vue";

import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes
} from "firebase/storage";

import { db } from "@/firebase";

const storage = getStorage();

const title = ref("");
const category = ref("");
const file = ref(null);

const options = ref([
  { title: "" },
  { title: "" }
]);

function handleFile(e) {
  file.value = e.target.files[0];
}

function addOption() {
  options.value.push({
    title: ""
  });
}

function removeOption(index) {
  options.value.splice(index, 1);
}

async function uploadMaterial() {
  try {
    let imageUrl = null;
    let path = null;

    // Upload image
    if (file.value) {
      const filename = `${Date.now()}-${file.value.name}`;
      path = `materials/${filename}`;

      const imageRef = storageRef(storage, path);

      await uploadBytes(imageRef, file.value);

      imageUrl = await getDownloadURL(imageRef);
    }

    // Create material document
    const materialRef = await addDoc(collection(db, "materials"), {
      title: title.value,
      category: category.value,
      image: imageUrl,
      path,
      createdAt: serverTimestamp()
    });

    // Create options subcollection
    for (const option of options.value) {
      if (!option.title.trim()) continue;

      await addDoc(
        collection(db, "materials", materialRef.id, "options"),
        {
          title: option.title,
          createdAt: serverTimestamp()
        }
      );
    }

    // Reset form
    title.value = "";
    category.value = "";
    file.value = null;

    options.value = [
      { title: "" },
      { title: "" }
    ];

    alert("Material uploaded!");
  } catch (error) {
    console.error("Upload error:", error);
  }
}
</script>

<template>
  <section class="admin-upload">
    <h1>Upload Material</h1>

    <input
      v-model="title"
      type="text"
      placeholder="Material title"
    />

    <input
      v-model="category"
      type="text"
      placeholder="Category"
    />

    <input
      type="file"
      @change="handleFile"
    />

    <div class="options">
      <h2>Options</h2>

      <div
        v-for="(option, index) in options"
        :key="index"
        class="option"
      >
        <input
          v-model="option.title"
          type="text"
          placeholder="Option title"
        />

        <button @click="removeOption(index)">
          Remove
        </button>
      </div>

      <button @click="addOption">
        Add option
      </button>
    </div>

    <button @click="uploadMaterial">
      Upload Material
    </button>
  </section>
</template>

<style lang="scss" scoped>
.admin-upload {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  display: flex;
  gap: 8px;
}
</style>