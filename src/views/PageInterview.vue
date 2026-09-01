<script setup lang="ts">
	import { computed, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useRoute } from 'vue-router';
	import { useInterviewStore } from '@/stores/interview';
  import { isTodayStage } from '@/utils/date';

	const route = useRoute();
	const interviewStore = useInterviewStore();
	const { singleInterview, isLoading } = storeToRefs(interviewStore);
	const { getInterviewById, updateInterview } = interviewStore;

	const interviewId = computed(() => {
		return route.params.id ? String(route.params.id) : '';
	});

	const addStage = () => {
		const newStageObj = {
			id: crypto.randomUUID(),
			name: '',
			date: null,
			description: '',
		};

		singleInterview.value?.stages?.push(newStageObj);
	};

	const removeStage = (id: string) => {
		if (!singleInterview.value || (!singleInterview.value?.stages && !id)) return;

		singleInterview.value.stages = singleInterview.value?.stages.filter((stage) => stage.id !== id);
	};

	watch(
		interviewId,
		(newId) => {
			singleInterview.value = null;
			if (newId) {
				getInterviewById(newId);
			}
		},
		{ immediate: true },
	);
</script>

<template>
	<div class="page page-interview">
		<h1>Редактирование собеседования</h1>
		<div v-if="!isLoading && singleInterview?.id" class="content">
			<Card>
				<template #title>Компания "{{ singleInterview.company }}"</template>
				<template #content>
					<div class="flex flex-column gap-2 mb-3">
						<label for="company">Компания</label>
						<InputText v-model="singleInterview.company" class="input" id="company" />
					</div>

					<div class="flex flex-column gap-2 mb-3">
						<label for="vacancy_link">Ссылка на вакансию</label>
						<InputText v-model="singleInterview.vacancy_link" class="input" id="vacancy_link" />
					</div>

					<div class="flex flex-column gap-2 mb-3">
						<label for="hr_name">Контакт (имя)</label>
						<InputText v-model="singleInterview.hr_name" class="input" id="hr_name" />
					</div>

					<div class="flex flex-column gap-2 mb-3">
						<label for="contact_telegram">Telegram</label>
						<InputText
							v-model="singleInterview.contact_telegram"
							class="input"
							id="contact_telegram"
						/>
					</div>

					<div class="flex flex-column gap-2 mb-3">
						<label for="contact_whatsapp">WhatsApp</label>
						<InputText
							v-model="singleInterview.contact_whatsapp"
							class="input"
							id="contact_whatsapp"
						/>
					</div>

					<div class="flex flex-column gap-2 mb-3">
						<label for="contact_email">Email</label>
						<InputText v-model="singleInterview.contact_email" class="input" id="contact_email" />
					</div>

					<div class="flex flex-column gap-2 mb-3">
						<label for="contact_phone">Телефон</label>
						<InputMask
							v-model="singleInterview.contact_phone"
							class="input"
							id="contact_phone"
							mask="+7 (999) 999-99-99"
							placeholder="+7 (___) ___-__-__"
						/>
					</div>

					<div class="flex flex-wrap gap-3 p-fluid mb-3">
						<div class="flex-auto flex flex-column gap-2">
							<label for="salary_from">Зарплатная вилка от</label>
							<InputNumber
								v-model="singleInterview.salary_from"
								inputId="salary_from"
								placeholder="Зарплатная вилка от"
							/>
						</div>
						<div class="flex-auto flex flex-column gap-2">
							<label for="salary_to">Зарплатная вилка от</label>
							<InputNumber
								v-model="singleInterview.salary_to"
								inputId="salary_to"
								placeholder="Зарплатная вилка до"
							/>
						</div>
					</div>

					<Button
						label="Добавить этап"
						severity="info"
						icon="pi pi-plus"
						class="mb-3 block ml-auto"
						@click="addStage"
					/>

					<div v-if="!singleInterview?.stages?.length" class="empty-block empty-stages">
						<span icon="pi pi-info-circle"></span>
						<p>Список этапов пуст</p>
					</div>

					<template v-else-if="singleInterview?.stages?.length">
						<div
							v-for="(stage, idx) in singleInterview.stages"
							:key="stage.id"
							class="interview-stage"
						>
							<Badge
								:value="`Этап ${idx + 1}`"
								class="block mr-auto mb-1"
                :class="isTodayStage(stage.date) ? 'bg-purple-300' : 'bg-blue-300'"
								style="max-width: 60px; cursor: default"
							/>

							<div class="flex flex-column gap-2 mb-3">
								<label :for="`stage_name-${stage?.id}`">Название этапа</label>
								<InputText v-model="stage.name" class="input" :id="`stage_name-${stage?.id}`" />
							</div>

							<div class="flex flex-column gap-2 mb-3">
								<label :for="`stage_calendar-${stage?.id}`">Дата прохождения этапа</label>
								<Calendar
									v-model="stage.date"
									:id="`stage_calendar-${stage?.id}`"
									dateFormat="dd.mm.yy"
									placeholder="дд.мм.гггг"
								/>
							</div>

							<div class="flex flex-column gap-2 mb-3">
								<label :for="`stage_description-${stage.id}`">Комментарии</label>
								<Textarea
									v-model="stage.description"
									:id="`stage_description-${stage.id}`"
									class="input"
									rows="3"
									autoResize
									placeholder="Комментарий к этапу..."
								/>
							</div>

							<Button
								label="Удалить этап"
								severity="danger"
								@click="removeStage(stage.id)"
								class="block ml-auto"
							/>
						</div>
					</template>

					<div class="flex flex-wrap gap-3 mb-3">
						<div class="flex align-items-center">
							<RadioButton
								v-model="singleInterview.status"
								class="--radio"
								inputId="interview_refusal"
								name="status"
								value="Refusal"
							/>
							<label for="interview_refusal" class="ml-2 cursor-pointer">Отказ</label>
						</div>

						<div class="flex align-items-center">
							<RadioButton
								v-model="singleInterview.status"
								class="--radio"
								inputId="interview_offer"
								name="status"
								value="Offer"
							/>
							<label for="interview_offer" class="ml-2 cursor-pointer">Оффер</label>
						</div>

						<div class="flex align-items-center">
							<RadioButton
								v-model="singleInterview.status"
								class="--radio"
								inputId="interview_pending"
								name="status"
								value="Pending"
							/>
							<label for="interview_pending" class="ml-2 cursor-pointer">В ожидании</label>
						</div>
					</div>

					<div class="mt-5">
						<Button
							label="Сохранить"
							icon="pi pi-save"
							class="block w-full"
							@click="updateInterview"
						/>
					</div>
				</template>
			</Card>
		</div>

		<div v-else-if="isLoading" class="loader">
			<ProgressSpinner style="width: 60px; height: 60px" strokeWidth="5" animationDuration=".4s" />
		</div>

		<div v-else class="empty-block">Собеседование не найдено</div>
	</div>
</template>

<style scoped>
	.page-interview {
		max-width: 600px;
		margin: auto;
	}

	.input {
		width: 100%;
	}

	.interview-stage {
		border: 1px solid #ccc;
		background-color: #f8f8f8;
		border-radius: 6px;
		padding: 10px;
		margin-bottom: 12px;
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

	.empty-stages {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-bottom: 40px;

		p {
			margin: 0;
			color: lightgrey;
			font-size: 24px;
			font-weight: 600;
		}
	}
</style>
