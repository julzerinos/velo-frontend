import {authenticate, logout, register, reset, user} from "./profile/profile";
import jwt from 'jwt-decode'

// TODO: Add error-specific messages

export const actions = {
    signupAsync({commit}, {profile, onSuccess, onFail}) {
        register(
            profile,
            r => {
                commit('setResult', {resultObject: {blame: 'signup', message: r.message}})
                return onSuccess()
            },
            r => {
                commit('setResult', {resultObject: {blame: 'signup', message: r.message}})
                return onFail()
            }
        ).then()
    },

    logoutAsync({commit, state}, {onSuccess, onFail}) {
        const onFinish = function (r) {
            commit('setResult', {resultObject: {blame: 'logout', message: r.message}})
            commit('logout')
        }

        logout(state.profile,
            r => {
                onFinish(r)
                return onSuccess(r)
            },
            r => {
                onFinish(r)
                return onFail(r)
            }
        ).then()
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
                ).then()
            },
            r => {
                commit('setResult', {resultObject: {blame: 'login', message: r.message}})
                onFail()
            }
        ).then()
    },

    userAsync({commit, state}) {
        user({username: state.profile.email, token: state.profile.token},
            r => {
                if (r['profile'] === undefined) {
                    commit('addResult', {
                        resultObject: {
                            blame: 'login',
                            message: "Server error: missing profile data"
                        }
                    })
                    throw new Error("missing profile")
                }

                commit('login', r)
            },
            r => {
                commit('addResult', {resultObject: {blame: 'login', message: r.message}})
            }
        ).then()
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
        ).then()
    },

    setResultAsync({commit}, {resultObject}) {
        commit('setResult', {resultObject: resultObject});
    },

    removeResultAsync({commit}) {
        commit('removeResult');
    },

    profileChangePropertyAsync({commit}, {property, value}) {
        commit('profileChangeProperty', {property, value})
    },

    addDataBrickAsync({commit}, payload) {
        commit('addDataBrick', payload)
    }
}