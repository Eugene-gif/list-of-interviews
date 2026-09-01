<script setup lang="ts">
	const footerData = [
		{
			id: 1,
			role: 'Особая благодарность за идею',
			name: 'Александр Белькевич',
			path: 'https://telegram.me/front_everyday',
		},
		{
			id: 2,
			role: 'Разработчик',
			name: 'Евгений Зуев',
			path: 'https://eugene-gif.github.io/Portfolio/#home',
		},
	];
</script>

<template>
	<Toolbar class="footer">
		<template #center>
			<div class="footer-container">
				<div class="text-500">&copy; 2026. Список собеседований.</div>
				<template v-if="footerData.length">
					<div v-for="item in footerData" :key="item.id" class="footer-item">
						<span>{{ item.role }}: </span>
						<a :href="item.path" class="footer-item-link" target="_blank" rel="noopener noreferrer">
							{{ item.name }}
						</a>
					</div>
				</template>
			</div>
		</template>
	</Toolbar>
</template>

<style scoped>
	.footer {
		margin-top: 40px;
	}

	.footer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.footer-item {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.footer-item-link {
		font-size: 16px;
		color: #8f8f8f;
	}
</style>
