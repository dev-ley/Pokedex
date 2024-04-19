import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';

import { pt_BR } from '../src/locales/pt_BR.js'; 
import { en } from '../src/locales/en.js'; 
import { es } from '../src/locales/es.js'; 


const languages = {
  pt_BR,
  en,
  es
};

const i18n = createI18n({
  locale: 'pt_BR',
  fallbackLocale: 'pt_BR', 
  messages: languages 
});

const app = createApp(App);

app.use(router);
app.use(i18n); 
app.use(store);

app.mount('#app');
