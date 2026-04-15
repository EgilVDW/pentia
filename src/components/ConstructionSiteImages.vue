<script setup>
import Camera from "@/assets/icons/Kamera.svg?url";
import BaseButton from "./BaseButton.vue";
defineProps({
  amount: {
    type: [String, Number],
    required: true
  }
})
</script>
<template>
	<BaseButton href="/" class="button-container">
		<img :src="Camera" class="button-container__icon" alt="camera icon">
		<div class="button-container__content">
			<h3 class="button-container__title">Byggeplads billeder</h3>
			<p class="button-container__description">{{ amount }} Nye billeder</p>
		</div>
	</BaseButton>
</template>
<style scoped lang="scss">
.button-container{
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 1rem;
	margin: 0rem 1.5rem;
	border-radius: $border-radius-large;
	background-image: url("/images/images_bygherre/hondverker-murer.png");
	background-size: cover;
	background-position: center;
	position: relative;
	overflow: hidden;
}
.button-container::before{
	content: "";
	position: absolute;
	inset: 0;
	background: $color-surface;
	opacity: 0.7;
	z-index: 0;
}
.button-container > * {
  position: relative;
  z-index: 1;
}
.button-container__icon{
	width: 32px;
	height: auto;
}
.button-container__content{
	display: flex;
	flex-direction: column;
	.button-container__title{
		font-size: $font-size-headline-2;
		font-weight: bold;
	}
	.button-container__description{
		font-size: $font-size-body;
	}
}
</style>