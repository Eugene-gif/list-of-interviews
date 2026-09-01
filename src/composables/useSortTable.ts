
import { ref } from 'vue';
import { useInterviewStore } from '@/stores/interview';
import { storeToRefs } from 'pinia';
import type { InterviewApp } from '@/types';

export function useSortTable() {
  const interviewStore = useInterviewStore();
  const { interviewList } = storeToRefs(interviewStore);

  const currentField = ref<string>('');
  const sortState = ref<'none' | 'asc' | 'desc'>('none');
  const originalList = ref<InterviewApp[]>([]);

  const customSort = (field: string) => {
    if (currentField.value !== field) {
      currentField.value = field;
      sortState.value = 'none';
    }

    if (sortState.value === 'none') {
      sortState.value = 'asc';
    } else if (sortState.value === 'asc') {
      sortState.value = 'desc';
    } else if (sortState.value === 'desc') {
      sortState.value = 'none';
    }

    if (sortState.value === 'none') {
      // Сброс сортировки к исходному порядку
      interviewList.value = [...originalList.value];
      currentField.value = '';
      return;
    }

    const order = sortState.value === 'asc' ? 1 : -1;

    interviewList.value.sort((a, b) => {
      let value1 = a[field as keyof typeof a];
      let value2 = b[field as keyof typeof b];

      // Обработка пустых значений
      if (value1 == null && value2 != null) return 1;
      if (value1 != null && value2 == null) return -1;
      if (value1 == null && value2 == null) return 0;

      // 1. Сортировка для этапов
      if (field === 'stages') {
        const lenA = (value1 as [] | undefined)?.length || 0;
        const lenB = (value2 as [] | undefined)?.length || 0;
        return (lenB - lenA) * order;
      }

      // 2. Сортировка для зарплаты
      if (field === 'salary_to') {
        const num1 = Number(value1) || 0;
        const num2 = Number(value2) || 0;
        return (num2 - num1) * order;
      }

      // 3. Сортировка для статуса
      if (field === 'status') {
        const STATUS_PRIORITY = {
          'Offer': 3,
          'Pending': 2,
          'Refusal': 1
        };

        const weightA = STATUS_PRIORITY[value1 as keyof typeof STATUS_PRIORITY] || 99;
        const weightB = STATUS_PRIORITY[value2 as keyof typeof STATUS_PRIORITY] || 99;

        return (weightB - weightA) * order;
      }

      return 0;
    });
  };

  return { currentField, sortState, originalList, customSort };
};
