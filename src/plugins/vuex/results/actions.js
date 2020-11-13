export const setResultAsync = function ({commit}, {resultObject}) {
    commit('setResult', {resultObject: resultObject});
}

export const removeResultAsync = function ({commit}) {
    commit('removeResult');
}