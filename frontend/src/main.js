import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/common.scss'
import './assets/css/font.css'

import { onResponse, notifyMessage } from './utils/common'
Vue.prototype.$notifyMessage = notifyMessage
Vue.prototype.$handleResponese = onResponse

import IconFont from '@/components/IconFont.vue'
import './assets/iconfont/iconfont'
Vue.component('icon-font', IconFont)

import Pagination from '@/components/Pagination'
Vue.component('vue-pagination', Pagination)

import Highlight from '@/assets/js/highlight.js'
Vue.use(Highlight)

Vue.config.productionTip = false

import axios from './service/axios'
import Element from 'element-ui'
Vue.use(axios)
Vue.use(Element)

// render App.vue to public/index.html "app" div
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
