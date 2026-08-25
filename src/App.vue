<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import HeaderApp from '@/components/HeaderApp.vue';
</script>

<template>
	<Toast position="top-center" />
	<ConfirmDialog group="dialog" />
	<div class="container">
		<HeaderApp />
		<div class="content">
			<RouterView />
		</div>
	</div>
</template>

<style scoped>
	.container {
		max-width: 1280px;
		margin: auto;
		padding: 20px;
	}
</style>
