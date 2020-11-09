export const getters = {
    loggedIn: state => (state.profile !== null),
    profile: state => state.profile,

    result: state => state.result,

    dataBricks: state => (state.profile !== null) ? state.profile.dataBricks.bricks : null,
    dataBrickConfigs: state => (state.profile !== null) ? state.profile.dataBricks.configs : null
}