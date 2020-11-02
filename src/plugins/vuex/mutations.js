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
        if (state.profile === null)
            return

        state.profile.dataBricks.bricks.push(payload)
    },
    removeDataBrick(state, payload) {
        if (state.profile === null)
            return

        state.profile.dataBricks.bricks.splice(payload.index, 1);
    },
    replaceDataBrick(state, payload) {
        if (state.profile === null)
            return

        Vue.set(state.profile.dataBricks.bricks, payload.index, payload.brick)
    },
    addDataBrickConfig(state, payload) {
        if (state.profile === null)
            return

        state.profile.dataBricks.configs.push(payload.config)
    },
    removeDataBrickConfig(state, payload) {
        if (state.profile === null)
            return

        state.profile.dataBricks.configs.splice(payload.index, 1);
    }
}