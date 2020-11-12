export const setResult = function (state, {resultObject}) {
    state.result = resultObject
}

export const removeResult = function (state) {
    state.result = null
}