export const getters = {
    loggedIn: state => (state.profile !== null),
    profile: state => state.profile,

    result: state => state.result,

    dataBricks: state => getters.loggedIn ? state.profile.dataBricks.bricks : null,
    dataBrickConfigs: state => getters.loggedIn ? state.profile.dataBricks.configs : null
}