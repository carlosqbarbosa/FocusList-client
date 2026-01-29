import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'cal-heatmap/cal-heatmap.css'
import { useAuthStore } from './store/auth.store'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)



app.use(router)

app.mount('#app')


