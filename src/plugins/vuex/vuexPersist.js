import VuexPersistence from "vuex-persist";

export const vuexCookie = new VuexPersistence({
    key: 'vuex',
    modules: ['profile', 'athletes'],
    storage: window.localStorage,
})

// TODO: add function for checking if token is fresh
// TODO: add tests (https://www.npmjs.com/package/jest-localstorage-mock)