import {authenticate, logout, register, reset, user} from "./profile";
import jwt from "jwt-decode";

export const signupAsync = function ({commit}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
    register(
        profile,
        r => {
            commit('setResult', {resultObject: {blame: 'signup', message: r.message}})
            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: {blame: 'signup', message: r.message}})
            return onFail(r)
        }
    ).then()
}

export const logoutAsync = function ({commit, state}, {onSuccess = r => r, onFail = r => r} = {}) {
    const onFinish = function (r) {
        commit('setResult', {resultObject: {blame: 'logout', message: r.message}})
        commit('logout')
    }

    logout(state.profile,
        r => {
            onFinish(r)
            r = onSuccess(r)
            return r
        },
        r => {
            onFinish(r)
            r = onFail(r)
            return r
        }
    ).then()
}

export const loginAsync = function ({commit, dispatch}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
    authenticate(profile,
        r => {
            if (r.headers['authorization'] === undefined) {
                commit('setResult', {
                    resultObject: {
                        blame: 'login',
                        message: "Server error: missing authorization token"
                    }
                })
                onFail()
                throw new Error("missing authorization token")
            }

            dispatch('userAsync', {
                profile: {
                    email: jwt(r.headers.authorization).sub,
                    token: r.headers.authorization
                },
                onSuccess: (r) => {
                    commit('setResult', {resultObject: {blame: 'login', message: "successfully logged in"}})
                    return onSuccess(r)
                },
                onFail: (r) => {
                    commit('setResult', {resultObject: {blame: 'login', message: r.message}})
                    return onFail(r)
                }
            })
        },
        r => {
            commit('setResult', {resultObject: {blame: 'login', message: r.message}})
            return onFail(r)
        }
    ).then()
}

export const userAsync = function ({commit, state, dispatch}, {profile = null, onSuccess = r => r, onFail = r => r} = {}) {
    if (profile === null)
        profile = {email: state.profile.email, token: state.profile.token}

    user(profile,
        r => {
            if (!('profile' in r)) {
                commit('addResult', {
                    resultObject: {
                        blame: 'login',
                        message: "Server error: missing profile data"
                    }
                })
                onFail(r)
                throw new Error("missing profile")
            }

            commit('login', r)
            dispatch('athletesAsync', {athleteIds: r.profile.athletes})

            return onSuccess(r)
        },
        r => {
            commit('addResult', {resultObject: {blame: 'login', message: r.message}})
            return onFail(r)
        }
    ).then()
}

export const resetPasswordAsync = function ({commit}, {email, onSuccess = r => r, onFail = r => r} = {}) {
    reset({email},
        r => {
            commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
            return onFail(r)
        }
    ).then()
}

export const profileChangePropertyAsync = function ({commit}, {property, value}) {
    commit('profileChangeProperty', {property, value})
}