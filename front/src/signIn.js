// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SignIn from './SignIn.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './lib/axios.config'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })

/* eslint-disable no-new */
new Vue({
    el: '#signIn',
    template: '<SignIn/>',
    components: { SignIn }
})
