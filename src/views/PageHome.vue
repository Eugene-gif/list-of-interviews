<script setup lang="ts">
	import { ref, type ComponentPublicInstance } from 'vue';
	import { useInterviewStore } from '@/stores/interview';
	import { storeToRefs } from 'pinia';

	const interviewStore = useInterviewStore();
	const { title, isLoading } = storeToRefs(interviewStore);
	const { createInterview } = interviewStore;

	const inputRef = ref<ComponentPublicInstance | null>(null);

	const createItem = async () => {
		await createInterview();
    if (inputRef.value?.$el) {
      inputRef.value.$el.focus();
    }
	};
</script>

<template>
	<div class="page page-home">
		<h1>Главная</h1>
		<div class="block">
			<InputText v-model="title" :disabled="isLoading" ref="inputRef" />

			<Button
				label="Создать"
				icon="pi pi-plus"
				@click="createItem"
				:disabled="!title.trim()"
				:loading="isLoading"
			/>
		</div>
	</div>
</template>

<style scoped>
	.block {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.email {
		max-width: 600px;
		overflow-wrap: break-word;
		hyphens: auto;
		text-wrap: pretty;
	}
</style>
