import {
    addCoach,
    athlete,
    athletes,
    authenticate,
    logout,
    register,
    reset,
    stravaImport,
    user,
    workoutsMetadata
} from "./profile/profile";
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

    loginAsync({commit, dispatch}, {profile, onSuccess = r => r, onFail = r => r} = {}) {
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
    },

    userAsync({commit, state, dispatch}, {profile = null, onSuccess = r => r, onFail = r => r} = {}) {
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

    athleteAsync({commit, state}, {athleteId, onSuccess = r => r, onFail = r => r} = {}) {
        athlete(
            {athleteId, token: state.profile.token},
            r => {
                commit('setResult', {resultObject: {blame: 'athlete', message: r.message}})
                commit('athlete', r)

                return onSuccess(r)
            },
            r => {
                commit('setResult', {resultObject: {blame: 'athlete', message: r.message}})
                return onFail(r)
            }
        ).then()
    },

    athletesAsync({commit, state, dispatch}, {athleteIds, onSuccess = r => r, onFail = r => r} = {}) {
        athletes(
            {athleteIds, token: state.profile.token},
            r => {
                commit('setResult', {resultObject: {blame: athletes.name, message: r.message}})

                const athletesParsed = []
                for (const athlete of r.data) {
                    athlete.first['workoutsMetadata'] = athlete.second
                    athletesParsed.push(athlete.first)
                    if (athlete.first.stravaConnected)
                        dispatch('stravaImport', {
                            athleteId: athlete.first.id,
                            from: Math.floor((Date.now() / 1000) - 10 * 24 * 60 * 60),
                            to: Math.floor(Date.now() / 1000)
                        })
                }

                commit('athletes', {athletes: athletesParsed})
                return onSuccess(r)
            },
            r => {
                commit('setResult', {resultObject: {blame: athletes.name, message: r.message}})
                return onFail(r)
            }
        ).then()
    },

    addCoachAsync({commit, state}, {coachEmail, onSuccess = r => r, onFail = r => r} = {}) {
        addCoach(
            {coachEmail, token: state.profile.token},
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

    stravaImport({commit, state}, {athleteId, from, to, onSuccess = r => r, onFail = r => r} = {}) {
        stravaImport(
            {athleteId, from, to, token: state.profile.token},
            r => {
                commit('setResult', {resultObject: {blame: 'stravaImport', message: r.message}})
                return onSuccess(r)
            },
            r => {
                commit('setResult', {resultObject: {blame: 'stravaImport', message: r.message}})
                return onFail(r)
            }
        ).then()
    },

    moveAthleteToFrontAsync({commit}, payload) {
        commit('moveAthleteToFront', payload)
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