import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import { vReveal } from './directives/reveal'
import './styles/global.scss'
import './styles/animations.scss'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// 初始化主题
useThemeStore(pinia).apply()

// 注册指令
app.directive('reveal', vReveal)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
