<script setup>
import { ref } from "vue";
import signup from "@/signup";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref(false);
const user = ref();

async function handleSignup() {
  error.value = "";
  success.value = false;

  try {
    user.value = await signup(email.value, password.value);

    await setDoc(doc(db, "users", user.value.uid), {
      avatarPath: "",
      avatarUrl: "",
      email: user.value.email,
      firstName: firstName.value,
      lastName: lastName.value,
      isActive: true,
      phoneNumber: "",
      role: "customer"
    });

    success.value = true;

    email.value = "";
    password.value = "";
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <div>
        <label>First Name</label>
        <input class="border" v-model="firstName" type="text" required />
      </div>
      <div>
        <label>Last Name</label>
        <input class="border" v-model="lastName" type="text" required />
      </div>
      <div>
        <label>Email</label>
        <input class="border" v-model="email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input class="border" v-model="password" type="password" required />
      </div>
      <button class="border background" type="submit">Sign Up</button>
    </form>

    <p v-if="error">
      {{ error }}
    </p>

    <p v-if="success">Account created successfully!</p>
  </div>
</template>

<style scoped lang="scss">
.border {
  border: 1px solid #000;
}
.background {
  background-color: #a3a3a3;
}
</style>
