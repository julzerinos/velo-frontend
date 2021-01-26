export const getWorkoutsForDataBrickAsync = async function ({dispatch, getters}, {athleteId, start, end}) {
    dispatch('workoutsAsync', {athleteId, start: 0, end})


    // const ath = getters.athlete(athleteId)
    // ath.workouts = getters.workouts(athleteId, start, end)


}

export const addDataBrickAsync = function ({commit}, payload) {
    commit('addDataBrick', payload)
}

export const removeDataBrickAsync = function ({commit}, payload) {
    commit('removeDataBrick', payload)
}

export const replaceDataBrickAsync = function ({commit}, payload) {
    commit('replaceDataBrick', payload)
}

export const addDataBrickConfigAsync = function ({commit}, payload) {
    commit('setResult', {resultObject: {blame: "Scripting", message: "Successfully saved script", type: 'success'}})
    commit('addDataBrickConfig', payload)
}

export const removeDataBrickConfigAsync = function ({commit}, payload) {
    commit('removeDataBrickConfig', payload)
}