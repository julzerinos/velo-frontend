import VuexPersistence from "vuex-persist";

export const vuexCookie = new VuexPersistence({
    key: 'vuex',
    modules: ['profile', 'athletes'],
    storage: window.localStorage,
})