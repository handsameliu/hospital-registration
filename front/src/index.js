// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './Index.vue'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from './lib/axios.config'

// import FastClick from 'fastclick'       // 移动端 添加
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.use(VCharts)
// FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<Index/>',
    components: { Index }
})
