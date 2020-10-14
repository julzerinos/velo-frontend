import {authenticate, logout, register, reset, user} from "./profile/profile";
import jwt from 'jwt-decode'

// TODO: Add error-specific messages

export const actions = {
    signupAsync({commit}, {profile, onSuccess, onFail}) {
        register(
            profile,
            r => {
                commit('setResult', {resultObject: {blame: 'signup', message: 'Signup success'}})
                onSuccess()
            },
            r => {
                commit('setResult', {resultObject: {blame: 'signup', message: 'Signup fail'}})
                onFail()
            }
        ).then()
    },

    logoutAsync({commit, state}) {
        logout(state.profile).then()
        commit('setResult', {resultObject: {blame: 'logout', message: "Logged out"}})
        commit('logout')
    },

    loginAsync({commit}, {profile, onSuccess, onFail}) {
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

                user({username: jwt(r.headers.authorization).sub, token: r.headers.authorization},
                    r => {
                        if (r['profile'] === undefined) {
                            commit('setResult', {
                                resultObject: {
                                    blame: 'login',
                                    message: "Server error: missing profile data"
                                }
                            })
                            onFail()
                            throw new Error("missing profile")
                        }

                        commit('setResult', {resultObject: {blame: 'login', message: "successfully logged in"}})
                        commit('login', r)
                        onSuccess()
                    },
                    r => {
                        commit('setResult', {resultObject: {blame: 'login', message: r.message}})
                        onFail()
                    }
                )
            },
            r => {
                commit('setResult', {resultObject: {blame: 'login', message: r.message}})
                onFail()
            }
        )
    },

    resetPasswordAsync({commit}, {email, onSuccess, onFail}) {
        reset({email},
            r => {
                commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
                onSuccess()
            },
            r => {
                commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
                onFail()
            }
        )
    },

    setResultAsync({commit}, {resultObject}) {
        commit('setResult', {resultObject: resultObject});
    },

    removeResultAsync({commit}) {
        commit('removeResult');
    },

    profileChangePropertyAsync({commit}, {property, value}) {
        commit('profileChangeProperty', {property, value})
    }
}