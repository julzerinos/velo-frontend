export const loggedIn = state => (state.profile !== null)
export const profile = state => state.profile

export const result = state => state.result

export const dataBricks = state => getters.loggedIn(state) ? state.profile.dataBricks.bricks : null
export const dataBrickConfigs = state => getters.loggedIn(state) ? state.profile.dataBricks.configs : null

export const athletes = state => getters.loggedIn(state) ? state.athletes : null

export const getters = {
    loggedIn, profile, result, dataBricks, dataBrickConfigs, athletes
}