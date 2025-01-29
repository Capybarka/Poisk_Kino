import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import vuetify from '@/plugins/vuetify';
import { createPinia } from 'pinia';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import '@/styles/main.css';

const app = createApp(App);

app
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .use(VueAwesomePaginate)
  .mount('#app');
