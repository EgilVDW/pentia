<script setup>
import Header from "@/components/Header.vue";
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";
</script>
<template>
    <Header />
    <HeadlineDesc
        title="Familien Milton"
        :text="'Type: Vinkelhus\nAdresse: Holkebjergvej 76\n5250 Odense'"
    />
    <ProjectStatusList />
</template>

