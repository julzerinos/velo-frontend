export const loggedIn = state => (state.profile !== null)
export const profile = state => state.profile

export const token = state => state.token
export const hasToken = state => state.token !== ''