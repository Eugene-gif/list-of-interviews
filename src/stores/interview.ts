import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useNotifications } from '@/composables/useNotifications';
import type { InterviewApp } from '@/types';

const getInitialFormState = (): InterviewApp => ({
  company: '',
  vacancy_link: '',
  hr_name: '',
  contact_email: '',
  contact_telegram: '',
  contact_whatsapp: '',
  contact_phone: ''
})

export const useInterviewStore = defineStore('interview', () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const { showSuccess, showError } = useNotifications();

  const userId = computed(() => user.value?.id ?? '');
  const interviewList = ref<InterviewApp[]>([]);
  const isLoading = ref<boolean>(false);
  const isLoadingDelete = ref<boolean>(false);
  const currentItemId = ref<string>('');

  const interviewForm = reactive<InterviewApp>(getInitialFormState());

  const resetForm = () => {
    Object.assign(interviewForm, getInitialFormState());
  }

  const createInterview = async () => {
    isLoading.value = true;
    try {
      const payload = {
        ...interviewForm,
        user_id: userId.value,
      };

      const { error } = await supabase
        .from('interviews')
        .insert([
          payload
        ]).select();

      if (error) throw error;
      showSuccess('Запись создана', '', 1000);
      resetForm();
    } catch (err: any) {
      showError(err.message);
    } finally {
      isLoading.value = false;
    }
  }

  const updateInterview = async () => {
    isLoading.value = true;
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update({
          user_id: userId.value,
        })
        .select()

      if (error) throw error;
      console.log('createInterview(): ', data);
      showSuccess('Запись обновлена');
    } catch (err: any) {
      showError(err.message);
    } finally {
      isLoading.value = false;
    }
  }

  const deleteInterviewById = async (id: string) => {
    if (!id) return;
    isLoadingDelete.value = true;
    currentItemId.value = id;
    try {
      const { error } = await supabase
        .from('interviews')
        .delete()
        .eq('id', id);

      interviewList.value = interviewList.value.filter(item => item.id !== id);

      if (error) throw error;

      showSuccess('Элемент удалён', '', 1000);
    } catch (err: any) {
      showError(err.message);
    } finally {
      isLoadingDelete.value = false;
      currentItemId.value = '';
    }
  }

  const getInterviews = async () => {
    isLoading.value = true;
    try {
      const { data: interviews, error } = await supabase
        .from('interviews')
        .select('*');

      if (error) {
        throw error;
      }

      interviewList.value = interviews.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    } catch (err: any) {
      showError(err.message);
    } finally {
      isLoading.value = false;
    }
  }

  console.log('✅ Init interview store');

  return { userId, interviewList, interviewForm, isLoading, isLoadingDelete, currentItemId, createInterview, updateInterview, deleteInterviewById, getInterviews };
})
