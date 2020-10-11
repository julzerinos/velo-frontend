export const mutations = {
    logout(state) {
        state.loggedIn = false;
        state.profile = null;
    },
    login(state, profile) {
        state.loggedIn = true;
        state.profile = profile;
    },
    addResult(state, payload) {
        state.asyncResults[payload.resultObject.blame] = Object.assign(
            {},
            state.asyncResults[payload.resultObject.blame],
            {[payload.id]: payload.resultObject}
        )
    },
    removeResult(state, payload) {
        delete state.asyncResults[payload.blame][payload.id];

        state.asyncResults[payload.blame] = Object.assign(
            {},
            state.asyncResults[payload.blame]
        )
    }
}