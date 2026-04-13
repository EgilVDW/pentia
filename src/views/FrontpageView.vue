<script setup>
import Header from "@/components/Header.vue";
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";
import IconTextButton from "@/components/IconTextButton.vue";
import documentIcon from "@/assets/icons/Dokumenter.svg?url";
</script>
<template>
    <Header />
    <HeadlineDesc
        title="Familien Milton"
        :text="'Type: Vinkelhus\nAdresse: Holkebjergvej 76\n5250 Odense'"
    />
    <ProjectStatusList />
    <IconTextButton :src="documentIcon" :size="32" text="Dokumenter"/>
</template>

