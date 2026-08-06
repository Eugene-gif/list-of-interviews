<script setup lang="ts">
	import { ref } from 'vue';

	const text = ref('');
</script>

<template>
	<div class="page page-home">
		<h1>Главная</h1>
		<div class="block">
			<InputText v-model="text" />
			{{ text }}
			<Button label="Кнопка" />
		</div>
	</div>
</template>

<style scoped>
	.block {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
