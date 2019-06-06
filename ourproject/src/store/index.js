'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    layout: 'login-layout',
    sidebarMenu: 0
  },
  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    },
    SET_SIDEBARMENU (state, payload) {
      state.sidebarMenu = payload
    }
  },
  getters: {
    layout (state) {
      return state.layout
    },
    sidebarMenu (state) {
      return state.sidebarMenu
    }
  },
  plugins: [createPersistedState()] //  for save state to window.localstorage
})
