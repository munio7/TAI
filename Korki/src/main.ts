import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuth } from './stores/authStore'

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {

      sessionStorage.clear();
      const { refreshRole } = useAuth();
      refreshRole()
      router.push({ name: 'who-are-you', params: { activePage: 'login' } })
        alert("Twoja sesja wygasła. Zaloguj się.")
    }
    return Promise.reject(error);
  }
);


const app = createApp(App)

app.use(router)

app.mount('#app')
