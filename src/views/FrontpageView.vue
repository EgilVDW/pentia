<script setup>
import Header from "@/components/HeaderBanner.vue";
import HeadlineDesc from "@/components/MainHeadlineDesc.vue";
import ProjectStatusList from "@/components/ProjectStatusList.vue";
import LargeIconButton from "@/components/LargeIconButton.vue";
import DocumentIcon from "@/assets/icons/Dokumenter.svg?url";
import ConstructionSiteImages from "@/components/ConstructionSiteImages.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>
<template>
    <Header />
    <HeadlineDesc
        title="Familien Milton"
        :text="'Type: Vinkelhus\nAdresse: Holkebjergvej 76\n5250 Odense'"
    />
    <ProjectStatusList />
    <LargeIconButton :src="DocumentIcon" :size="32" text="Dokumenter"/>
    <ConstructionSiteImages :amount="2"/>
    <NavigationBar />
</template>

