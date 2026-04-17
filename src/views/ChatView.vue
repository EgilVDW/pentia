<script setup>
import MessageList from "@/components/MessageList.vue";

const data = [
  {
    user: "user1",
    content: "",
    timestamp: "",
    status: ""
  }
];

const user = "user1";
</script>
<template>
  <MessageList :data="data" :user="user" />
</template>
