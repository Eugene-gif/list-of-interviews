<script setup lang="ts">
	import { ref, computed, type ComponentPublicInstance } from 'vue';
	import { useInterviewStore } from '@/stores/interview';
	import { storeToRefs } from 'pinia';

	const interviewStore = useInterviewStore();
	const { interviewForm, isLoading } = storeToRefs(interviewStore);
	const { createInterview } = interviewStore;

	const inputRef = ref<ComponentPublicInstance | null>(null);

	const createNewInterview = async () => {
		await createInterview();
		if (inputRef.value?.$el) {
			inputRef.value.$el.focus();
		}
	};

	const disabledSaveButton = computed(() => {
		return !(
			interviewForm.value.company &&
			interviewForm.value.vacancy_link &&
			interviewForm.value.hr_name
		);
	});
</script>

<template>
	<div class="page page-home">
		<Card>
			<template #title>Новое собеседование</template>
			<template #content>
				<InputText v-model="interviewForm.company" ref="inputRef" class="input mb-3" placeholder="Компания" />
				<InputText
					v-model="interviewForm.vacancy_link"
					class="input mb-3"
					placeholder="Ссылка на вакансию"
				/>
				<InputText v-model="interviewForm.hr_name" class="input mb-3" placeholder="Контакт (имя)" />
				<InputText
					v-model="interviewForm.contact_telegram"
					class="input mb-3"
					placeholder="Telegram username HR"
				/>
				<InputText
					v-model="interviewForm.contact_whatsapp"
					class="input mb-3"
					placeholder="WhatsApp HR"
				/>

        <InputText
          v-model="interviewForm.contact_email"
          class="input mb-3"
          placeholder="Email HR"
        />

				<InputMask
					v-model="interviewForm.contact_phone"
					class="input mb-3"
					mask="+7 (999) 999-99-99"
					placeholder="+7 (___) ___-__-__"
				/>

				<Button
					@click="createNewInterview"
					label="Создать собеседование"
					:disabled="disabledSaveButton"
					:loading="isLoading"
				/>
			</template>
		</Card>
	</div>
</template>

<style scoped>
	.page-home {
		margin: auto;
		max-width: 600px;
	}

	.input {
		width: 100%;
	}
</style>
