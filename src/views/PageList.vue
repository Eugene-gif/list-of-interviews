<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useInterviewStore } from '@/stores/interview';
	import { storeToRefs } from 'pinia';

	const interviewStore = useInterviewStore();
	const { interviewList, isLoading, isLoadingDelete, currentItemId } = storeToRefs(interviewStore);
	const { getInterviews, deleteInterviewById } = interviewStore;

	onMounted(getInterviews);
</script>

<template>
	<div class="page page-list">
		<h1>Список собеседований</h1>
		<div v-if="interviewList.length && !isLoading" class="interview-list">
			<div v-for="item in interviewList" :key="item.id" class="item" :data-id="item.id">
				<div class="item-text">
					{{ item }}
				</div>
				<Button
					class="item-btn-delete"
					severity="danger"
					label="Удалить"
					icon="pi pi-trash"
					@click.stop="deleteInterviewById(item.id ?? '')"
					:disabled="isLoadingDelete"
					:loading="currentItemId === item.id"
				/>
			</div>
		</div>

		<div v-else-if="isLoading" class="loader">
			<ProgressSpinner style="width: 60px; height: 60px" strokeWidth="5" animationDuration=".4s" />
		</div>

		<div v-else class="empty-block">Список пуст</div>
	</div>
</template>

<style scoped>
	.interview-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.item {
		border: 2px solid lightgrey;
		border-radius: 10px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 10px;

		.item-text {
			font-size: 18px;
			font-weight: 500;
			overflow-wrap: break-word;
			hyphens: auto;
			text-wrap: pretty;
		}

		.item-btn-delete {
			flex-shrink: 0;
		}
	}

	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.empty-block {
		font-size: 20px;
		color: grey;
		font-weight: 600;
	}
</style>
