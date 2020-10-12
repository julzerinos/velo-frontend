import Vue from 'vue'

export const mutations = {
    logout(state) {
        state.profile = null;
    },
    login(state, {profile}) {
        state.profile = profile;
    },
    addResult(state, {resultObject}) {
        state.asyncResults[resultObject.blame] = resultObject
    },
    removeResult(state, {blame}) {
        state.asyncResults[blame] = null;
    },
    profileChangeProperty(state, {property, value}) {
        // TODO: add error display

        if (property in state.profile)
            Vue.set(state.profile, property, value)
    }
}