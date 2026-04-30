<script setup>
import Message from "@/components/Message.vue";

defineProps({
  data: Array,
  user: String
});
</script>
<template>
  <div class="message-list">
    <Message
      v-for="(item, index) in data"
      :key="index"
      :outgoing="item.sender === user"
      :content="item.content"
      :timestamp="item.timestamp"
      :status="item.status"
    />
  </div>
</template>
<style scoped lang="scss">
.message-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
