<script setup>
const props = defineProps({
    doc: Object
});

const formatDate = (date) => {
    if (!date) return 'Dato mangler';
    
    const d = date.toDate ? date.toDate() : new Date(date);
    
    return d.toLocaleDateString('da-DK', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

const openFile = (url) => {
    if (url) {
        window.open(url, '_blank');
    } else {
        console.warn("Ingen URL fundet på dette dokument");
    }
};
</script>

<template>
    <div class="document">
        <div class="document-item" @click="openFile(doc.fileUrl)">
            <div class="document-item__icon">
               <!-- file icon here -->
            </div>

            <div class="document-item__info">
                <h4>{{ doc.name }}</h4>
                <p>{{ doc.category }} {{ formatDate(doc.date) }}</p>
            </div>

            <div class="document-item__arrow">
               <!-- arrow icon here -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.document-item{
    border: 2px solid grey;
    width: 200px;
    cursor: pointer;
}

p{
    font-size: 12px;
    color: grey;
}
h4{
    font-weight: bold;
}
</style>