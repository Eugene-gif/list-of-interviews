<script setup lang="ts">
	import { ref, computed } from 'vue';
	import type { ComputedRef } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useAuthStore } from '@/stores/auth';

	interface IMenuItem {
		label: string;
		icon: string;
		path: string;
		show?: ComputedRef<boolean>;
	}

	const userStore = useAuthStore();
	const { signOut } = userStore;
	const { user, isAuth } = storeToRefs(userStore);

	const email = computed(() => user.value?.email ?? 'Нет email');

	const items = ref<IMenuItem[]>([
		{
			label: 'Авторизация',
			icon: 'pi pi-user',
			path: '/auth',
			show: computed(() => !isAuth.value),
		},
		{
			label: 'Добавить',
			icon: 'pi pi-plus',
			path: '/',
			show: computed(() => !!isAuth.value),
		},
		{
			label: 'Список собеседований',
			icon: 'pi pi-list',
			path: '/list',
			show: computed(() => !!isAuth.value),
		},
		{
			label: 'Статистика',
			icon: 'pi pi-chart-pie',
			path: '/statistic',
			show: computed(() => !!isAuth.value),
		},
	]);

	const subMenu = ref();

	const toggleSubMenu = (event: Event) => {
		subMenu.value.toggle(event);
	};
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

		<template v-if="isAuth" #end>
			<Button
				type="button"
				icon="pi pi-user"
				@click="toggleSubMenu"
				aria-haspopup="true"
				aria-controls="overlay_menu"
			/>

			<Menu ref="subMenu" id="overlay_menu" :popup="true">
				<template #start>
					<div class="inner-container-submenu">
						<div class="email">{{ email }}</div>
					</div>
				</template>

				<template #end>
					<div class="inner-container-submenu">
						<Button
							@click="signOut"
							class="w-full flex align-item-center btn-signout"
							severity="danger"
						>
							<span class="pi pi-sign-out p-menuitem-icon"></span>
							<span class="ml-2">Выход</span>
						</Button>
					</div>
				</template>
			</Menu>
		</template>
	</Menubar>
</template>

<style scoped>
	.menu {
		margin: 30px 0;
	}

	.router-link-active.router-link-exact-active {
		background-color: lavender;
		pointer-events: none;
		cursor: default;
	}

	.email {
		font-size: 20px;
		font-weight: 700;
		color: forestgreen;
		overflow-wrap: break-word;
		hyphens: auto;
		text-wrap: pretty;
	}

	.inner-container-submenu {
		padding: 10px;
	}

	.btn-signout {
		cursor: pointer;
	}
</style>
