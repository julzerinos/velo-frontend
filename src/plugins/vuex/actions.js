import {login, logout, signup} from "./profile/profile";

export const actions = {
    signupAsync({commit}, {profile}) {
        // TODO: create detailed results based on response (eg. 409 => account exists)
        const onSuccess = function () {
            commit('addResult', {resultObject: {blame: 'signup', message: 'Success!'}})
        }
        const onFail = function () {
            commit('addResult', {resultObject: {blame: 'signup', message: 'Fail!'}})
        }

        signup(
            profile,
            onSuccess,
            onFail
        ).then()
    },

    logoutAsync({commit, state}) {
        logout(state.profile).then()
        commit('logout')
    },

    loginAsync({commit}, {profile}) {
        // TODO: create detailed results based on response (eg. 400 => fail)
        const onSuccess = function (response) {
            commit('login', response)
            // commit('addResult', {resultObject: {blame: 'login', message: 'Success!'}})
        }
        const onFail = function () {
            commit('addResult', {resultObject: {blame: 'login', message: 'Fail!'}})
        }

        login(profile, onSuccess, onFail).then()
    },

    addResultAsync({commit}, {resultObject}) {
        commit('addResult', {resultObject: resultObject});

        if ('lifetime' in resultObject)
            setTimeout(function () {
                commit('removeResult', {blame: resultObject.blame});
            }, resultObject.lifetime);
    },

    removeResultAsync({commit}, {blame}) {
        commit('removeResult', {blame: blame});
    },

    profileChangePropertyAsync({commit}, {property, value}) {
        commit('profileChangeProperty', {property, value})
    }
}