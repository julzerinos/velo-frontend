import {authenticate, logout, register, reset, user} from "./profile/profile";
import jwt from 'jwt-decode'

// TODO: Add error-specific messages

export const actions = {
    signupAsync({commit}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
        register(
            profile,
            r => {
                console.log(r)
                commit('setResult', {resultObject: {blame: 'signup', message: r.message}})
                return onSuccess(r)
            },
            r => {
                console.log(r)
                commit('setResult', {resultObject: {blame: 'signup', message: r.message}})
                return onFail(r)
            }
        ).then()
    },

    logoutAsync({commit, state}, {onSuccess = r => r, onFail = r => r} = {}) {
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
    },

    loginAsync({commit}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
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
                        return onSuccess(r)
                    },
                    r => {
                        commit('setResult', {resultObject: {blame: 'login', message: r.message}})
                        return onFail(r)
                    }
                ).then()
            },
            r => {
                commit('setResult', {resultObject: {blame: 'login', message: r.message}})
                return onFail(r)
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

    resetPasswordAsync({commit}, {email, onSuccess = r => r, onFail = r => r} = {}) {
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