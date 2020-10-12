export const getters = {
    loggedIn: state => (state.profile !== null),
    profile: state => state.profile,

    result: state => blame => state.asyncResults[blame]
}