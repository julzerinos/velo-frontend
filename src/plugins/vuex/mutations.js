import Vue from 'vue'

export const mutations = {
    logout(state) {
        state.profile = null;
    },
    login(state, {profile}) {
        state.profile = profile;
    },
    setResult(state, {resultObject}) {
        state.result = resultObject
    },
    removeResult(state) {
        state.result = null
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