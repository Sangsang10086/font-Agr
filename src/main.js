
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import store from "@/store/store.js";
import App from './App.vue'
import locale from 'element-plus/dist/locale/zh-cn.js'
import { createPinia } from 'pinia';
import VChart from 'vue-echarts';
import * as echarts from 'echarts';
const app = createApp(App)

document.title = '助农电商后台管理系统'
// 注册 Pinia
app.use(createPinia());
app.use(ElementPlus, { locale })
app.use(router)
app.use(store)
app.component('VChart', VChart);
app.mount('#app')

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}