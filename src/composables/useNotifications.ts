import { useToast } from 'primevue/usetoast';
import { LIFETIME } from '@/constants/constants';

export function useNotifications() {
  const toast = useToast();

  const showError = (text: string, summary: string = 'Error', life: number = LIFETIME) => {
    toast.add({
      severity: 'error',
      summary: summary,
      detail: text ?? '',
      life: life,
    });
  };

  const showSuccess = (text: string, summary: string = 'Success', life: number = LIFETIME) => {
    toast.add({
      severity: 'success',
      summary: summary,
      detail: text,
      life: life,
    });
  };

  const showInfo = (text: string, summary: string = 'Info', life: number = LIFETIME) => {
    toast.add({
      severity: 'info',
      summary: summary,
      detail: text ?? '',
      life: life,
    });
  };

  return { showError, showSuccess, showInfo };
}
