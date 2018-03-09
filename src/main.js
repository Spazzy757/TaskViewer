// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.min.css'
import VueCookies from 'vue-cookies'
import Vuetify from 'vuetify'
import router from './router'
import App from './App'
import HttpHelper from './mixins/HttpHelper'
import store from './store'
import Vue from 'vue'

Vue.mixin(HttpHelper)

Vue.use(Vuetify)
Vue.use(VueCookies)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
