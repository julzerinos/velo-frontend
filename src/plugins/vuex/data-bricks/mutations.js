import Vue from "vue";

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