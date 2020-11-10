import {addCoach, athlete, authenticate, logout, register, reset, user, workoutsMetadata} from "./profile/profile";
import jwt from 'jwt-decode'

// TODO: Add error-specific messages

export const actions = {
    signupAsync({commit}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
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

                user({email: jwt(r.headers.authorization).sub, token: r.headers.authorization},
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
        user({email: state.profile.email, token: state.profile.token},
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

    workoutsMetadataAsync({commit, state}, {athleteId, onSuccess = r => r, onFail = r => r} = {}) {
        workoutsMetadata(
            {athleteId, token: state.profile.token},
            r => {
                // commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
                return onSuccess(r)
            },
            r => {
                // commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
                return onFail(r)
            }
        ).then()
    },

    athletesAsync({commit, state}, {athleteEmails, onSuccess = r => r, onFail = r => r} = {}) {
        for (const athleteEmail of athleteEmails)
            athlete(
                {athleteEmail, token: state.profile.token},
                r => {
                    commit('setResult', {resultObject: {blame: 'athlete', message: r.message}})
                    return onSuccess(r)
                },
                r => {
                    commit('setResult', {resultObject: {blame: 'athlete', message: r.message}})
                    return onFail(r)
                }
            ).then()
    },

    addCoachAsync({commit}, {coachEmail, onSuccess = r => r, onFail = r => r} = {}) {
        addCoach(
            {coachEmail},
            r => {
                commit('setResult', {resultObject: {blame: 'addCoach', message: r.message}})
                return onSuccess(r)
            },
            r => {
                commit('setResult', {resultObject: {blame: 'addCoach', message: r.message}})
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
    },

    removeDataBrickAsync({commit}, payload) {
        commit('removeDataBrick', payload)
    },

    replaceDataBrickAsync({commit}, payload) {
        commit('replaceDataBrick', payload)
    },

    addDataBrickConfigAsync({commit}, payload) {
        commit('addDataBrickConfig', payload)
    },

    removeDataBrickConfigAsync({commit}, payload) {
        commit('removeDataBrickConfig', payload)
    }
}