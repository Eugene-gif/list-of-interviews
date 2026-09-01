<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useInterviewStore } from '@/stores/interview';
	import { storeToRefs } from 'pinia';
	import type { InterviewApp } from '@/types';

	const interviewStore = useInterviewStore();
	const { getInterviews } = interviewStore;
	const { interviewList, isLoading } = storeToRefs(interviewStore);

	const chartData = ref();
	const chartOptions = ref();

	const setChartData = () => {
		const documentStyle = getComputedStyle(document.body);

		const stats = { Offer: 0, Refusal: 0, Pending: 0 };
		interviewList.value.forEach((interview: InterviewApp) => {
			stats[interview.status as keyof typeof stats] += 1;
		});
		const data = [stats.Offer, stats.Refusal, stats.Pending];

		return {
			labels: ['Офферы', 'Отказы', 'В ожидании'],
			datasets: [
				{
					data,
					backgroundColor: [
						documentStyle.getPropertyValue('--green-500'),
						documentStyle.getPropertyValue('--red-500'),
						documentStyle.getPropertyValue('--gray-500'),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue('--green-400'),
						documentStyle.getPropertyValue('--red-400'),
						documentStyle.getPropertyValue('--gray-400'),
					],
				},
			],
		};
	};

	const setChartOptions = () => {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');

		return {
			plugins: {
				legend: {
					labels: {
						cutout: '60%',
						color: textColor,
					},
				},
			},
		};
	};

	onMounted(async () => {
		await getInterviews();
		chartData.value = setChartData();
		chartOptions.value = setChartOptions();
		isLoading.value = false;
	});
</script>

<template>
	<div class="page page-statistic">
		<h1>Статистика</h1>
		<div
			v-if="!isLoading && chartData"
			class="card flex justify-content-center flex-direction-column"
		>
			<Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
			<div v-if="!interviewList.length" class="empty-block">Нет данных для статистики</div>
		</div>

		<div v-else-if="isLoading && !chartData" class="loader">
			<ProgressSpinner style="width: 60px; height: 60px" strokeWidth="5" animationDuration=".4s" />
		</div>

		<div v-else class="empty-block">Не удалось загрузить данные</div>
	</div>
</template>

<style scoped>
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
