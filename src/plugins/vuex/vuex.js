import 'es6-promise/auto'
import Cookies from 'js-cookie'

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// TODO: double check jwt token security
// https://stackoverflow.com/questions/34817617/should-jwt-be-stored-in-localstorage-or-cookie#:~:text=localStorage%20is%20subjected%20to%20XSS,then%20are%20subjected%20to%20CSRF.
const vuexCookie = new VuexPersistence({
    modules: ['profile', 'loggedIn'],
    saveState: (key, state, storage) => Cookies.set(key, state, {
        expires: 3
    }),
    restoreState: (key, storage) => Cookies.getJSON(key),
    filter: (mutation) => mutation.type === 'login' || mutation.type === 'logout'
})

Vue.use(Vuex)

export const state = {
    loggedIn: false,
    profile: null,

    asyncResults: {
        signup: {},
        signin: {}
    },

    dataBricks: []
}

export const getters = {
    loggedIn: state => state.loggedIn,
    profile: state => state.profile,

    results: state => blame => (state.asyncResults[blame] || null),

    dataBricks: state => state.dataBricks
}

export const mutations = {
    logout(state) {
        state.loggedIn = false;
        state.profile = null;
    },
    login(state, profile) {
        state.loggedIn = true;
        state.profile = profile;
    },
    addResult(state, payload) {
        state.asyncResults[payload.resultObject.blame] = Object.assign(
            {},
            state.asyncResults[payload.resultObject.blame],
            {[payload.id]: payload.resultObject}
        )
    },
    removeResult(state, payload) {
        delete state.asyncResults[payload.blame][payload.id];

        state.asyncResults[payload.blame] = Object.assign(
            {},
            state.asyncResults[payload.blame]
        )
    },
    addDataBrick(state, payload) {
        state.dataBricks.push({
            brickConfig: payload.brickConfig,
            dataConfig: payload.dataConfig
        })
    }
}

export const actions = {
    logoutAsync({commit}) {
        commit('logout')
    },
    loginAsync({commit}, profile) {
        commit('login', profile)
    },
    addResultAsync({commit}, resultObject) {
        const ts = +new Date();
        commit('addResult', {id: ts, resultObject: resultObject});

        if (resultObject.lifetime > 0)
            setTimeout(function () {
                commit('removeResult', {blame: resultObject.blame, id: ts});
            }, resultObject.lifetime);
    },
    addDataBrickAsync({commit}, payload) {
        commit('addDataBrick', payload)
    }
}

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    plugins: [vuexCookie.plugin]
})