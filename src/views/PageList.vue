<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useInterviewStore } from '@/stores/interview';
	import { useConfirmApp } from '@/composables/useConfirmApp';
	import { storeToRefs } from 'pinia';
	import { formatPhoneForUI, clearPhone } from '@/utils/formatPhone';

	const interviewStore = useInterviewStore();
	const { confirmDeletePopup } = useConfirmApp();

	const { interviewList, isLoading, isLoadingDelete, currentItemId } = storeToRefs(interviewStore);
	const { getInterviews, deleteInterviewById } = interviewStore;

	onMounted(getInterviews);
</script>

<template>
	<ConfirmPopup group="popup" />
	<div class="page page-list">
		<h1>Список собеседований</h1>
		<div v-if="interviewList.length && !isLoading" class="interview-list">
			<DataTable class="table" :value="interviewList">
				<Column field="company" header="Компания" />
				<Column field="hr_name" header="Имя HR" />
				<Column field="vacancy_link" header="Вакансия">
					<template #body="slotProps">
						<a
							v-if="slotProps.data.vacancy_link"
							class="vacancy"
							:href="slotProps.data.vacancy_link"
							target="_blank"
							rel="noopener noreferrer"
							>{{ slotProps.data.vacancy_link }}</a
						>
						<span class="vacancy" v-else>Не заполнено</span>
					</template>
				</Column>

				<Column header="Контакты">
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
								>
									<span class="contacts__icon pi pi-envelope"></span>
								</a>
							</div>

							<a
								v-if="propsSlot.data.contact_phone"
								:href="`tel:+${clearPhone(propsSlot.data.contact_phone)}`"
								class="contacts__phone"
								target="_blank"
								rel="noopener noreferrer"
							>
								{{ formatPhoneForUI(propsSlot.data.contact_phone) }}
							</a>
						</div>
					</template>
				</Column>

				<Column header="Действия">
					<template #body="propsSlot">
						<div class="flex gap-2">
							<RouterLink :to="`/interview/${propsSlot.data.id}`">
								<Button icon="pi pi-pencil" severity="info" />
							</RouterLink>

							<Button
								class="item-btn-delete"
								severity="danger"
								icon="pi pi-trash"
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
			color: #371777;
		}

		.contacts__icon {
			font-size: 20px;
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
