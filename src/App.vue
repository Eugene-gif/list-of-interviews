<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import HeaderApp from '@/components/HeaderApp.vue';
	import FooterApp from '@/components/FooterApp.vue';
</script>

<template>
	<Toast position="top-center" />
	<ConfirmDialog group="dialog" />
	<ConfirmPopup group="popup" />
	<div class="container">
		<HeaderApp />
		<div class="content flex-grow-1">
			<RouterView />
		</div>
		<FooterApp />
	</div>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 1280px;
		margin: auto;
		padding: 20px;
		height: 100dvh;
	}
</style>
