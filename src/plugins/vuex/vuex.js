import 'es6-promise/auto'

import Vue from 'vue'
import Vuex from 'vuex'

import {vuexCookie} from "./vuexPersist";

import {actions} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";
import {state} from "./state";

Vue.use(Vuex)

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    plugins: [vuexCookie.plugin]
})