import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import router from '@/router';
import { useNotifications } from '@/composables/useNotifications';
import { STORAGE_KEYS, getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage';
import type { Session } from '@supabase/supabase-js';

interface SessionApp {
  access_token?: string | null;
  refresh_token?: string | null;
};

interface UserApp {
  id?: string;
  user_id?: string;
  email?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const { showError, showSuccess } = useNotifications();
  const isLogin = ref<boolean>(true);
  const email = ref<string>('');
  const password = ref<string>('');
  const isLoading = ref<boolean>(false);

  const user = ref<UserApp | null>(getFromStorage(STORAGE_KEYS.USER) ?? null);
  const session = ref<SessionApp | null>(getFromStorage(STORAGE_KEYS.SESSION) ?? null);

  const isAuth = computed(() => !!user.value?.id);
  const accessToken = computed(() => session.value?.access_token ?? '');

  const refreshUser = (data: Session | null) => {
    if (!data?.user) return;

    user.value = {
      id: data.user.id,
      user_id: data.user?.identities?.[0]?.user_id,
      email: data.user.email,
    }

    saveToStorage(STORAGE_KEYS.USER, user.value);
  }

  const refreshSession = (data: Session | null) => {
    if (!data) return;

    session.value = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }

    saveToStorage(STORAGE_KEYS.SESSION, session.value);
  }

  const signIn = async () => {
    try {
      isLoading.value = true;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      refreshUser(data.session);
      refreshSession(data.session);
      router.push('/');
      showSuccess('Добро пожаловать!', 'Успешный вход', 3000);
    } catch (err: any) {
      showError(err.message ?? 'Ошибка входа в профиль. Попробуйте позже.');
    } finally {
      isLoading.value = false;
    }
  };


  const signUp = async () => {
    if (password.value.length < 6) {
      showError('Пароль не может быть меньше 6 символов');
      return;
    }

    try {
      isLoading.value = true;

      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      refreshUser(data.session);
      refreshSession(data.session);
      router.push('/');
      showSuccess('Добро пожаловать!', 'Успешная регистрация', 3000);
    } catch (err: any) {
      showError(err.message ?? 'Ошибка регистрации. Попробуйте позже.');
    } finally {
      isLoading.value = false;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    removeFromStorage(STORAGE_KEYS.USER);
    removeFromStorage(STORAGE_KEYS.SESSION);
    session.value = null;
    user.value = null;
    router.push('/auth');
  }

  return { signUp, signIn, signOut, refreshSession, refreshUser, email, password, isLogin, isLoading, user, accessToken, isAuth };
})
