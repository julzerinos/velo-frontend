export const getters = {
    loggedIn: state => (state.profile !== null),
    profile: state => state.profile,

    result: state => state.result,

    dataBricks: state => state.dataBricks
}