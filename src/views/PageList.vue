<script setup lang="ts">
	import { ref, computed, watch, onMounted } from 'vue';
	import { useInterviewStore } from '@/stores/interview';
	import { useConfirmApp } from '@/composables/useConfirmApp';
	import { storeToRefs } from 'pinia';
	import { formatPhoneForUI, clearPhone } from '@/utils/formatPhone';
	import { useNotifications } from '@/composables/useNotifications';
	import { useSortTable } from '@/composables/useSortTable';
	import type { InterviewApp } from '@/types';

	const { showSuccess, showError } = useNotifications();
	const { currentField, sortState, originalList, customSort } = useSortTable();

	const interviewStore = useInterviewStore();
	const { confirmDeletePopup } = useConfirmApp();

	const { interviewList, isLoading, isLoadingDelete, currentItemId } = storeToRefs(interviewStore);
	const { getInterviews, deleteInterviewById } = interviewStore;

	const styleBadge = (status: 'Offer' | 'Refusal' | 'Pending') => {
		if (!status) return '';

		const colorStatus = {
			Offer: ['success', 'Оффер'],
			Refusal: ['danger', 'Отказ'],
			Pending: ['warning', 'Ожидание'],
		};

		return colorStatus[status];
	};

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			showSuccess('Ссылка скопирована в буфер обмена', '', 2000);
		} catch {
			showError('Не получилось скопировать ссылку, попробуйте позже', 'Ошибка копирования', 2000);
		}
	};

	const formatNumber = (num: number) => {
		if (typeof num !== 'number') return 0;
		return num.toLocaleString('ru-RU', { maximumFractionDigits: 0 });
	};

	watch(
		() => interviewList.value,
		(newVal) => {
			if (newVal.length && !originalList.value.length) {
				originalList.value = [...newVal];
			}
		},
		{ deep: true },
	);

	onMounted(getInterviews);
</script>

<template>
	<div class="page page-list">
		<h1>Список собеседований</h1>
		<div v-if="interviewList.length && !isLoading" class="interview-list">
			<DataTable class="table" :value="interviewList" responsiveLayout="stack" removableSort>
				<Column field="company" header="Компания" class="custom-column" />
				<Column field="hr_name" header="Имя HR" class="custom-column" />
				<Column field="vacancy_link" header="Вакансия" class="custom-column">
					<template #body="slotProps">
						<div v-if="slotProps.data.vacancy_link" class="vacancy">
							<a
								class="vacancy__link"
								v-tooltip.bottom="{ value: slotProps.data.vacancy_link, autoHide: false }"
								:href="slotProps.data.vacancy_link"
								target="_blank"
								rel="noopener noreferrer"
								>{{ slotProps.data.vacancy_link }}</a
							>
							<Button
								class="vacancy__copy"
								icon="pi pi-copy"
								severity="secondary"
								text
								rounded
								size="small"
								v-tooltip.top="'Скопировать ссылку'"
								@click="copyToClipboard(slotProps.data.vacancy_link)"
							/>
						</div>

						<span class="vacancy" v-else>Нет ссылки</span>
					</template>
				</Column>

				<Column header="Контакты" class="custom-column">
					<template #body="propsSlot">
						<div class="contacts">
							<div class="contacts__social">
								<a
									v-if="propsSlot.data.contact_telegram"
									:href="`https://telegram.me/${propsSlot.data.contact_telegram}`"
									class="contacts__telegram"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span class="contacts__icon pi pi-telegram"></span>
								</a>

								<a
									v-if="propsSlot.data.contact_whatsapp"
									:href="`https://wa.me/${propsSlot.data.contact_whatsapp}`"
									class="contacts__whatsapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span class="contacts__icon pi pi-whatsapp"></span>
								</a>

								<a
									v-if="propsSlot.data.contact_email"
									:href="`mailto:${propsSlot.data.contact_email}`"
									class="contacts__email"
									target="_blank"
									rel="noopener noreferrer"
									v-tooltip.top="{
										value: propsSlot.data.contact_email,
										autoHide: false,
									}"
								>
									<span class="contacts__icon pi pi-envelope"></span>
								</a>

								<a
									v-if="propsSlot.data.contact_phone"
									:href="`tel:+${clearPhone(propsSlot.data.contact_phone)}`"
									class="contacts__phone"
									target="_blank"
									rel="noopener noreferrer"
									v-tooltip.top="{
										value: formatPhoneForUI(propsSlot.data.contact_phone),
										autoHide: false,
									}"
								>
									<span class="contacts__icon pi pi-phone"></span>
								</a>
							</div>
						</div>
					</template>
				</Column>

				<Column class="custom-column">
					<template #header>
						<span @click="customSort('stages')" class="custom-header color-blue-6">
							<span>Этапы</span>
							<span
								v-if="currentField === 'stages' && sortState === 'asc'"
								class="pi pi-arrow-up text-green-400"
							></span>
							<span
								v-else-if="currentField === 'stages' && sortState === 'desc'"
								class="pi pi-arrow-down text-red-400"
							></span>
							<span v-else class="pi pi-sort-alt text-gray-500"></span>
						</span>
					</template>

					<template #body="propsSlot">
						<Badge
							v-if="!propsSlot.data.stages.length"
							value="0"
							class="bg-gray-400"
							rounded
							v-tooltip.top="'Нет этапов'"
						/>
						<div v-else class="interview-stages">
							<template v-for="(stage, idx) in propsSlot.data.stages" :key="stage.id">
								<Badge
									:value="Number(idx) + 1"
									class="bg-blue-300"
									rounded
									v-tooltip.top="stage.name"
								/>
							</template>
						</div>
					</template>
				</Column>

				<Column class="custom-column">
					<template #header>
						<span @click="customSort('salary_to')" class="custom-header">
							<span>Оклад</span>
							<span
								v-if="currentField === 'salary_to' && sortState === 'asc'"
								class="pi pi-arrow-up text-green-400"
							></span>
							<span
								v-else-if="currentField === 'salary_to' && sortState === 'desc'"
								class="pi pi-arrow-down text-red-400"
							></span>
							<span v-else class="pi pi-sort-alt text-gray-500"></span>
						</span>
					</template>

					<template #body="propsSlot">
						<span v-if="!propsSlot.data.salary_from">Не заполнено</span>
						<span v-else> {{ formatNumber(propsSlot.data.salary_to) }}</span>
					</template>
				</Column>

				<Column class="custom-column">
					<template #header>
						<span @click="customSort('status')" class="custom-header">
							<span> Статус </span>
							<span
								v-if="currentField === 'status' && sortState === 'asc'"
								class="pi pi-arrow-up text-green-400"
							></span>
							<span
								v-else-if="currentField === 'status' && sortState === 'desc'"
								class="pi pi-arrow-down text-red-400"
							></span>
							<span v-else class="pi pi-sort-alt text-gray-500"></span>
						</span>
					</template>

					<template #body="propsSlot" field="status">
						<Badge
							:value="styleBadge(propsSlot.data.status)[1]"
							:severity="styleBadge(propsSlot.data.status)[0]"
							rounded
						/>
					</template>
				</Column>

				<Column header="Действия" class="custom-column">
					<template #body="propsSlot">
						<div class="flex gap-2">
							<RouterLink :to="`/interview/${propsSlot.data.id}`" v-tooltip.top="'Редактировать'">
								<Button icon="pi pi-pencil" severity="info" />
							</RouterLink>

							<Button
								class="item-btn-delete"
								severity="danger"
								icon="pi pi-trash"
								v-tooltip.top="'Удалить'"
								@click="confirmDeletePopup($event, propsSlot.data.id, deleteInterviewById)"
								:disabled="isLoadingDelete"
								:loading="currentItemId === propsSlot.data.id"
							/>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>

		<div v-else-if="isLoading" class="loader">
			<ProgressSpinner style="width: 60px; height: 60px" strokeWidth="5" animationDuration=".4s" />
		</div>

		<div v-else class="empty-block">Список пуст, добавьте собеседование</div>
	</div>
</template>

<style scoped>
	.vacancy {
		display: flex;
		align-items: center;
		gap: 5px;

		.vacancy__link {
			max-width: 100px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.contacts {
		display: flex;
		align-items: center;
		gap: 15px;

		.contacts__social {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 10px;
		}

		.contacts__telegram {
			color: #0088cc;
		}

		.contacts__whatsapp {
			color: #25d366;
		}

		.contacts__email {
			color: #0088cc;
		}

		.contacts__phone {
			color: #838383;
		}

		.contacts__icon {
			font-size: 20px;
		}
	}

	.interview-stages {
		display: flex;
		align-items: center;
		gap: 5px;
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

	:deep(.custom-column) {
		.custom-header {
			cursor: pointer;
			user-select: none;
			display: flex;
			align-items: center;
			gap: 5px;
		}

		.p-badge {
			cursor: default;
		}
	}

	@media screen and (max-width: 960px) {
		:deep(.custom-column) {
			gap: 20px;
		}

		.vacancy {
			.vacancy__link {
				max-width: 100%;
				overflow: visible;
				white-space: normal;
				word-break: break-all;
				text-overflow: clip;
			}

			.vacancy__copy {
				display: none;
			}
		}
	}
</style>
