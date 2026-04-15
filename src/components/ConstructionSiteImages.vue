<script setup>
import Camera from "@/assets/icons/Kamera.svg?url"
defineProps({
  amount: {
    type: [String, Number],
    required: true
  }
})
</script>
<template>
	<div class="container">
		<img :src="Camera" class="icon" alt="camera icon">
		<div class="text">
			<h3>Byggeplads billeder</h3>
			<p>{{ amount }} Nye billeder</p>
		</div>
	</div>
</template>
<style scoped lang="scss">
.container{
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
.container::before{
	content: "";
	position: absolute;
	inset: 0;
	background: $color-surface;
	opacity: 0.7;
	z-index: 0;
}
.container > * {
  position: relative;
  z-index: 1;
}
.icon{
	width: 32px;
	height: auto;
}
.text{
	display: flex;
	flex-direction: column;
	h3{
		font-size: $font-size-headline-2;
		font-weight: bold;
	}
	p{
		font-size: $font-size-body;
	}
}
</style>