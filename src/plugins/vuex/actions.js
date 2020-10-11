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
    }

}