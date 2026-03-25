import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* 创建整个站点应用实例。 */

const app = createApp(App)

/* 注册全局状态与路由能力。 */

app.use(createPinia())
app.use(router)

/* 将应用挂载到页面根节点。 */

app.mount('#app')
