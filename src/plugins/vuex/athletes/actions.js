import {addCoach, athlete, athletes, stravaImport, workout, workoutsMetadata} from "../profile/profile";

export const workoutsMetadataAsync = function ({commit, state}, {athleteId, onSuccess = r => r, onFail = r => r} = {}) {
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
}

export const workoutsAsync = function ({commit, state}, {start, end, onSuccess = r => r, onFail = r => r} = {}) {

}

export const workoutAsync = function ({commit, state}, {workoutId, onSuccess = r => r, onFail = r => r} = {}) {
    workout(
        {workoutId, token: state.profile.token},
        r => {
            commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
            commit('workout', {workout: r.data})
            return onSuccess(r)
        },
        r => {
            commit('setResult', {resultObject: {blame: 'reset', message: r.message}})
            return onFail(r)
        }
    ).then()
}

export const athleteAsync = function ({commit, state}, {athleteId, onSuccess = r => r, onFail = r => r} = {}) {
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
}

export const athletesAsync = function ({commit, state, dispatch}, {athleteIds, onSuccess = r => r, onFail = r => r} = {}) {
    athletes(
        {athleteIds, token: state.profile.token},
        r => {
            commit('setResult', {resultObject: {blame: athletes.name, message: r.message}})

            const athletesParsed = []
            for (const athlete of r.data) {
                athlete.first['workoutsMetadata'] = athlete.second
                athletesParsed.push(athlete.first)
                if (athlete.first.stravaConnected)
                    dispatch('stravaImportAsync', {
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
}

export const addCoachAsync = function ({commit, state}, {coachEmail, onSuccess = r => r, onFail = r => r} = {}) {
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
}

export const stravaImportAsync = function ({commit, state}, {athleteId, from, to, onSuccess = r => r, onFail = r => r} = {}) {
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
}

export const moveAthleteToFrontAsync = function ({commit}, payload) {
    commit('moveAthleteToFront', payload)
}