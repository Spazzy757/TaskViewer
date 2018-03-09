import Vue from 'vue'
import Vuex from 'vuex'
import requests from 'vuex-requests/src/store/modules/requests'

Vue.use(Vuex)

const state = {
  environment: 'https://kong-staging.vumatel.co.za',
  service: 'sync'
}

const mutations = {
  changeService (state, payload) {
    state.service = payload.service
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    requests: requests
  }
})
