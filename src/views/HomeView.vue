<script setup lang="ts">
	import { ref } from 'vue';

	const text = ref('');
</script>

<template>
	<h1>Некоторый тестовый контент</h1>
	<div class="block">
		<InputText v-model="text" />
		{{ text }}
		<Button label="Кнопка" />
	</div>
</template>

<style scoped>
	.block {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
