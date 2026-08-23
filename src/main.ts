import '@/assets/main.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.component('Toast', Toast)
app.mount('#app');
