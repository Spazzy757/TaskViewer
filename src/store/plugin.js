import store from './index'

export default {
  store,
  install (Vue, options) {
    Vue.prototype.$env = process.env
    Vue.prototype.$store = store
  }
}
