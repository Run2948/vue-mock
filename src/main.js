import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

import './mock/index.js'
import './plugins/antd.js'

Vue.config.productionTip = false
Vue.use(VueResource)
// Vue.http.options.emulateJSON = true

new Vue({
  render: h => h(App)
}).$mount('#app')
