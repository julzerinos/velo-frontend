import Vue from 'vue'

export const mutations = {
    logout(state) {
        state.profile = null;
    },
    login(state, {profile}) {
        state.profile = profile;
    },
    addResult(state, {resultObject}) {
        Vue.set(state.results, resultObject.blame, resultObject)
        // state.results[resultObject.blame] = resultObject
    },
    removeResult(state, {blame}) {
        state.results[blame] = null;
    },
    profileChangeProperty(state, {property, value}) {
        if (property in state.profile)
            Vue.set(state.profile, property, value)
    },
    addDataBrick(state, payload) {
        state.dataBricks.push({
            brickConfig: payload.brickConfig,
            dataConfig: payload.dataConfig
        })
    }
}