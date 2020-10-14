import {authenticate, logout, register, user} from "./profile/profile";
import jwt from 'jwt-decode'

// TODO: Add error-specific messages

export const actions = {
    signupAsync({commit}, {profile}) {
        const onSuccess = function () {
            commit('addResult', {resultObject: {blame: 'signup', message: 'Signup success'}})
        }
        const onFail = function () {
            commit('addResult', {resultObject: {blame: 'signup', message: 'Signup fail'}})
        }

        register(
            profile,
            onSuccess,
            onFail
        ).then()
    },

    logoutAsync({commit, state}) {
        logout(state.profile).then()
        commit('logout')
    },

    loginAsync({commit}, {profile}) {
        authenticate(profile,
            r => {
                if (r.headers['authorization'] === undefined) {
                    commit('addResult', {
                        resultObject: {
                            blame: 'login',
                            message: "Server error: missing authorization token"
                        }
                    })
                    throw new Error("missing authorization token")
                }

                user({username: jwt(r.headers.authorization).sub, token: r.headers.authorization},
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
                )
            },
            r => {
                commit('addResult', {resultObject: {blame: 'login', message: r.message}})
            }
        )
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
        )
    },

    addResultAsync({commit}, {resultObject}) {
        commit('addResult', {resultObject: resultObject});

        if ('lifetime' in resultObject)
            setTimeout(function () {
                commit('removeResult', {blame: resultObject.blame});
            }, resultObject.lifetime);
    },

    removeResultAsync({commit}, {blame}) {
        commit('removeResult', {blame: blame});
    },

    profileChangePropertyAsync({commit}, {property, value}) {
        commit('profileChangeProperty', {property, value})
    },


    addDataBrickAsync({commit}, payload) {
        commit('addDataBrick', payload)
    }
}