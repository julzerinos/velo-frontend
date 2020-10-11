export const getters = {
    loggedIn: state => state.profile !== null,
    profile: state => state.profile,

    results: state => blame => (state.asyncResults[blame] || null)
}