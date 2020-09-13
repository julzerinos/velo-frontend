import 'es6-promise/auto'

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        profile: null
    },
    mutations: {
        logout(state) {
            state.loggedIn = false;
            state.profile = null;
        },
        login(state, profile) {
            state.loggedIn = true;
            state.profile = profile;
        }
    },
    actions: {
        logoutAsync({commit}) {
            commit('logout')
        },
        loginAsync({commit}, profile) {
            commit('login', profile)
        },
    },
    plugins: [vuexLocal.plugin]
})