import Vue from 'vue'
import Vuex from 'vuex'
import dash from '@/repositories/global/dashboard'

Vue.use(Vuex)

const state = {
  sidebarShow: dash.sidebarShow(),
  sidebarMinimize: dash.sidebarMinimize(),
  asideShow: false,
  darkMode: dash.darkMode(),
  apiAdress: 'http://127.0.0.1:8000'
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
    dash.dashboardUpdate('sidebarShow', state.sidebarShow)
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
    dash.dashboardUpdate('sidebarShow', state.sidebarShow)
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  toggle(state, variable) {
    state[variable] = !state[variable]
  },
  darkMode(state, variable) {
    state[variable] = !state[variable]
    dash.dashboardUpdate('darkMode', state[variable])
  },
  sidebarMinimize(state, variable) {
    state[variable] = !state[variable]
    dash.dashboardUpdate('sidebarMinimize', state[variable])
  },
  asideShow(state, variable) {
    state[variable] = !state[variable]
  },
}

export default new Vuex.Store({
  state,
  mutations
})