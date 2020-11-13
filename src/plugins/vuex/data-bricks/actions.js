export const getWorkoutsForDataBrickAsync = async function ({dispatch, getters}, {athleteIds, start, end}) {
    for (const athlete of athleteIds) {
        const r = await dispatch('workoutsAsync', {athlete, start, end})
        console.log(r)
    }
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
    commit('addDataBrickConfig', payload)
}

export const removeDataBrickConfigAsync = function ({commit}, payload) {
    commit('removeDataBrickConfig', payload)
}