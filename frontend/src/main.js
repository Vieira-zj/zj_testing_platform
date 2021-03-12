import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './service/axios'
import Element from 'element-ui'

import './assets/css/common.scss'
import './assets/css/font.css'

import { onResponse, notifyMessage } from './utils/commonMethods'
Vue.prototype.$notifyMessage = notifyMessage
Vue.prototype.$handleResponese = onResponse

import IconFont from '@/components/IconFont.vue'
import './assets/iconfont/iconfont'
Vue.component('icon-font', IconFont)

import Pagination from '@/components/Pagination'
Vue.component('vue-pagination', Pagination)

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(Element)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
