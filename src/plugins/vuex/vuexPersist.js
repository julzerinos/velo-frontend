import VuexPersistence from "vuex-persist";

export const vuexCookie = new VuexPersistence({
    key: 'vuex',
    modules: ['token'],
    storage: window.localStorage,
})