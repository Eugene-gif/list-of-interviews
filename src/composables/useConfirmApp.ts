
import { useConfirm } from "primevue/useconfirm";
import { useNotifications } from '@/composables/useNotifications';

interface ConfirmDeleteCallback {
  (id: string): void;
}

export function useConfirmApp() {
  const { showSuccess } = useNotifications();
  const confirm = useConfirm();

  const confirmDeletePopup = (event: Event, id: string, callback: ConfirmDeleteCallback) => {
    confirm.require({
      group: 'popup',
      target: event.currentTarget as HTMLElement,
      header: 'Удаление собеседования',
      message: `Вы действительно хотите удалить запись?`,
      icon: 'pi pi-info-circle',
      rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
      acceptClass: 'p-button-danger p-button-sm',
      rejectLabel: 'Отмена',
      acceptLabel: 'Удалить',
      accept: () => {
        callback(id);
      },
    });
  };

  const confirmDeleteDialog = () => {
    confirm.require({
      group: 'dialog',
      header: 'Подтверждение удаления',
      message: 'Вы уверены, что хотите безвозвратно удалить эту запись?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => showSuccess('Успешно удалено')
    });
  };

  return { confirmDeletePopup, confirmDeleteDialog };
};


