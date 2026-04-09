<script setup>
import userIcon from "@/assets/icons/user-icon.png";
import miltonLogo from "@/assets/milton-logo.png";
</script>
<template>
    <header class="header">
        <img :src="miltonLogo" alt="Milton logo">
        <img :src="userIcon" alt="Profile icon">
    </header>
</template>

<style scoped>
.header{
    height: 129px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 16px 24px;
    img{
        height: 48px;
    }
}
</style>