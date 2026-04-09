<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    }
})
</script>

<template>
    <div class="position">
        <h2>
            {{ title }}
        </h2>
        <p v-if="text" class="text">
            {{ text }}
        </p>
    </div>

</template>

<style scoped>
.text{
    white-space: pre-line;
    line-height: normal;
}
.position{
    padding: 0 2rem;
}
</style>