<script setup lang="ts">
	import { ref } from 'vue';

	const text = ref('Какой-то список');
</script>

<template>
	<div class="page page-list">
		<h1>Список собеседований</h1>
		{{ text }}
	</div>
</template>

<style scoped></style>
