import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Error Handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.log('Error info:', info)
}

app.mount('#app')
