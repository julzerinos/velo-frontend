import Vue from 'vue'

export const logout = function (state) {
    state.profile = null;
    state.athletes = []
}

export const login = function (state, {profile}) {
    state.profile = profile;
}

export const setResult = function (state, {resultObject}) {
    state.result = resultObject
}

export const removeResult = function (state) {
    state.result = null
}

export const profileChangeProperty = function (state, {property, value}) {
    if (property in state.profile)
        Vue.set(state.profile, property, value)
}

export const addDataBrick = function (state, payload) {
    if (state.profile === null)
        return

    state.profile.dataBricks.bricks.push(payload)
}

export const removeDataBrick = function (state, payload) {
    if (state.profile === null)
        return

    state.profile.dataBricks.bricks.splice(payload.index, 1);
}

export const replaceDataBrick = function (state, payload) {
    if (state.profile === null)
        return

    Vue.set(state.profile.dataBricks.bricks, payload.index, payload.brick)
}

export const addDataBrickConfig = function (state, payload) {
    if (state.profile === null)
        return

    state.profile.dataBricks.configs.push(payload)
}

export const removeDataBrickConfig = function (state, payload) {
    if (state.profile === null)
        return

    state.profile.dataBricks.configs.splice(payload.index, 1);
}

export const athlete = function (state, payload) {
    const index = state.athletes.findIndex(x => x.id === payload.athlete.id)
    index === -1 ?
        state.athletes.push(payload.athlete) :
        Vue.set(state.profile.athletes, index, payload.athlete)
}

export const athletes = function (state, payload) {
    for (const athlete of payload.athletes)
        mutations.athlete(state, {athlete})
}

export const moveAthleteToFront = function (state, payload) {
    const index = state.athletes.findIndex(x => x.id === payload.athlete.id)

    const athlete = state.athletes.splice(index, 1)
    state.athletes.unshift(athlete[0])
}

export const mutations = {
    logout,
    login,
    setResult,
    removeResult,
    profileChangeProperty,
    addDataBrick,
    removeDataBrick,
    replaceDataBrick,
    addDataBrickConfig,
    removeDataBrickConfig,
    athlete,
    athletes,
    moveAthleteToFront
}

export default mutations