<script setup lang="ts">
	import { ref, computed } from 'vue';
	import type { ComputedRef } from 'vue';
  import router from '@/router';
	import { useUserStore } from '@/stores/user';

	interface IMenuItem {
		label: string;
		icon: string;
		path: string;
		show?: ComputedRef<boolean>;
	}

	const userStore = useUserStore();

	const items = ref<IMenuItem[]>([
		{
			label: 'Авторизация',
			icon: 'pi pi-user',
			path: '/auth',
			show: computed(() => !userStore.userId),
		},
		{
			label: 'Добавить',
			icon: 'pi pi-plus',
			path: '/',
			show: computed(() => !!userStore.userId),
		},
		{
			label: 'Список собеседований',
			icon: 'pi pi-list',
			path: '/list',
			show: computed(() => !!userStore.userId),
		},
		{
			label: 'Статистика',
			icon: 'pi pi-chart-pie',
			path: '/statistic',
			show: computed(() => !!userStore.userId),
		},
	]);

  const logIn = () => {
    userStore.userId = '1';
    router.push('/');
  }

  const logOut = () => {
    userStore.userId = '';
    router.push('/auth');
  }
</script>

<template>
	<Menubar :model="items" class="menu">
		<template #item="{ item, props }">
			<template v-if="item.show">
				<RouterLink
					:to="item.path"
					v-bind="props.action"
					class="flex align-items-center"
					:aria-hidden="undefined"
				>
					<span :class="item.icon" class="p-menuitem-icon"></span>
					<span class="ml-2">{{ item.label }}</span>
				</RouterLink>
			</template>
		</template>

		<template #end>
			<Button
				v-if="userStore.userId"
				@click="logOut"
				class="flex align-item-center menu-exit"
				severity="danger"
			>
				<span class="pi pi-sign-out p-menuitem-icon"></span>
				<span class="ml-2">Выход</span>
			</Button>

      <Button
				v-else
				@click="logIn"
				class="flex align-item-center menu-exit"
				severity="success"
			>
				<span class="pi pi-sign-out p-menuitem-icon"></span>
				<span class="ml-2">Войти</span>
			</Button>
		</template>
	</Menubar>
</template>

<style scoped>
	.menu {
		margin: 30px 0;
	}
	.menu-exit {
		cursor: pointer;
	}
</style>
