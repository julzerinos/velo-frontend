import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";

export const vuexCookie = new VuexPersistence({
    modules: ['profile'],
    saveState: (key, state) => Cookies.set(key, state, {
        expires: 3
    }),
    restoreState: (key) => Cookies.getJSON(key),
    filter: (mutation) => ['login', 'logout', 'profileChangeProperty'].includes(mutation.type)
})

// TODO: add function for checking if token is fresh
// TODO: add tests (https://www.npmjs.com/package/jest-localstorage-mock)