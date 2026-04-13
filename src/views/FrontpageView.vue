<script setup>
import Header from "@/components/Header.vue";
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";
import IconTextButton from "@/components/IconTextButton.vue";
import DocumentIcon from "@/assets/icons/Dokumenter.svg?url";
import ConstructionSiteImages from "@/components/ConstructionSiteImages.vue";
import Navigation from "@/components/Navigation.vue";
</script>
<template>
    <Header />
    <HeadlineDesc
        title="Familien Milton"
        :text="'Type: Vinkelhus\nAdresse: Holkebjergvej 76\n5250 Odense'"
    />
    <ProjectStatusList />
    <IconTextButton :src="DocumentIcon" :size="32" text="Dokumenter"/>
    <ConstructionSiteImages :amount="2"/>
    <Navigation />
</template>

