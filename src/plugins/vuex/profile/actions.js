import {authenticate, logout, newPassword, register, reset, user} from "./profile";
import jwt from "jwt-decode";
import {formatResult} from "../results/results";

export const signupAsync = function ({commit}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
    register(
        profile,
        r => {
            commit('setResult', {resultObject: formatResult('register', r)})
            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: formatResult('register', r)})
            return onFail(r)
        }
    ).then()
}

export const logoutAsync = function ({commit, state}, {onSuccess = r => r, onFail = r => r} = {}) {
    const onFinish = function (r) {
        commit('setResult', {resultObject: formatResult('logout', r)})
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
                commit('setResult', {resultObject: formatResult('login', r)})
                onFail()
                throw new Error("missing authorization token")
            }

            dispatch('userAsync', {
                profile: {
                    email: jwt(r.headers.authorization).sub,
                    token: r.headers.authorization
                },
                onSuccess: (r) => {
                    commit('setResult', {resultObject: formatResult('login', r)})
                    return onSuccess(r)
                },
                onFail: (r) => {
                    commit('setResult', {resultObject: formatResult('login', r)})
                    return onFail(r)
                }
            })
        },
        r => {
            commit('setResult', {resultObject: formatResult('login', r)})
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
                commit('setResult', {resultObject: formatResult('user', r)})
                onFail(r)
                throw new Error("missing profile")
            }

            commit('login', r)
            dispatch('athletesAsync', {athleteIds: r.profile.athletes})

            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: formatResult('user', r)})
            return onFail(r)
        }
    ).then()
}

export const resetPasswordAsync = function ({commit}, {email, onSuccess = r => r, onFail = r => r} = {}) {
    reset({email},
        r => {
            commit('setResult', {resultObject: formatResult('reset', r)})
            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: formatResult('reset', r)})
            return onFail(r)
        }
    ).then()
}

export const newPasswordAsync = function ({commit}, {tokenId, password, onSuccess = r => r, onFail = r => r} = {}) {
    newPassword({tokenId, password},
        r => {
            commit('setResult', {resultObject: formatResult('newPassword', r)})
            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: formatResult('newPassword', r)})
            return onFail(r)
        }
    ).then()
}

export const profileChangePropertyAsync = function ({commit}, {property, value}) {
    commit('profileChangeProperty', {property, value})
}