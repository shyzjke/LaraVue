import './bootstrap';
import { createApp } from 'vue';


import axios from 'axios'

import App from './components/App.vue'


import router from './router'



axios.defaults.baseURL = 'http://localhost:8000/api/';
 
 
createApp(App).use(router).mount('#app') 