<script setup>
import { ref, computed } from "vue";

const photos = ref([
  { id: 1, filename: "site_1.png", date: "05/03-2026" },
  { id: 2, filename: "site_2.png", date: "04/03-2026" },
  { id: 3, filename: "site_3.png", date: "04/03-2026" },
  { id: 4, filename: "site_4.png", date: "04/03-2026" },
  { id: 5, filename: "site_5.png", date: "04/03-2026" },
  { id: 6, filename: "site_6.png", date: "03/03-2026" },
  { id: 7, filename: "site_7.png", date: "03/03-2026" },
  { id: 8, filename: "site_8.png", date: "03/03-2026" },
  { id: 9, filename: "site_9.png", date: "03/03-2026" },
  { id: 10, filename: "site_10.png", date: "02/03-2026" },
  { id: 11, filename: "site_11.png", date: "02/03-2026" },
  { id: 12, filename: "site_12.png", date: "02/03-2026" },
  { id: 13, filename: "site_13.png", date: "02/03-2026" },
  { id: 14, filename: "site_14.png", date: "01/03-2026" },
  { id: 15, filename: "site_15.png", date: "01/03-2026" },
  { id: 16, filename: "site_16.png", date: "01/03-2026" },
  { id: 17, filename: "site_17.png", date: "01/03-2026" },
  { id: 18, filename: "site_18.png", date: "01/03-2026" }
]);


const selectedId = ref(null);

const activePhoto = computed(() => {
  return photos.value.find(p => p.id === selectedId.value);
});

const togglePhoto = (id) => {
  selectedId.value = selectedId.value === id ? null : id;
};

const getImageUrl = (name) => {
  return `/images/images_bygherre/Byggeplads_galleri/${name}`;
};
</script>

<template>
    <div class="photo-gallery">
        <div class="photo-gallery-grid">
          <div
            v-for="photo in photos"
            :key="photo.id"
            class="photo-gallery-grid__item"
            @click="togglePhoto(photo.id)"
          >
            <img :src="getImageUrl(photo.filename)" alt="Byggeplads" />
            <div class="photo-gallery-grid__date">Dato: {{ photo.date }}</div>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="activePhoto" class="modal-overlay" @click="selectedId = null">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="selectedId = null">X</button>
            <img :src="getImageUrl(activePhoto.filename)" class="modal-image" />
            <div class="modal-info">Dato: {{ activePhoto.date }}</div>
          </div>
        </div>
      </Transition>
    </div>
</template>

<style lang="scss" scoped>
.photo-gallery-grid{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 10px 0;

  &__item {
    position: relative;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    border-radius: $border-radius-small;
    overflow: hidden;
  }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    &__date {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(25, 68, 81, 0.9);
      color: $color-surface;
      font-size: $font-size-body;
      border-radius: $border-radius-small;
      padding: 5px 1.5px 5px 1.5px;
      text-align: center;
      font-weight: 700;
    }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 600px;
  border-radius: $border-radius-small;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0.5);

  .modal-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .modal-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: $color-surface;
    background: rgba(25, 68, 81, 0.7);
    font-weight: 400;
    padding: 20px 20px;
    text-align: left;
    box-sizing: border-box;
    font-size: $font-size-headline-2;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  }

  .modal-close {
      position: absolute;
      width: 40px;
      height: 40px;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      color: $color-primary;
      font-size: $font-size-headline-1;
      cursor: pointer;
      font-weight: 600;
      line-height: $line-height-body;
      z-index: 10;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0,3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
  }
</style>