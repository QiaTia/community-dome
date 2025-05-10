import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import component from './utils/component';

createApp(App).use(component).mount('#app');
