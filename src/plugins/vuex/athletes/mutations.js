import Vue from "vue";
import {sortedIndex} from "./athletes";

export const athlete = function (state, {athlete}) {
    const index = state.athletes.findIndex(x => x.id === athlete.id)
    index === -1 ?
        state.athletes.push(athlete) :
        Vue.set(state.profile.athletes, index, athlete)
}

export const athletes = function (state, payload) {
    for (const ath of payload.athletes)
        athlete(state, {athlete: {...ath, workouts: []}})
}

export const moveAthleteToFront = function (state, payload) {
    const index = state.athletes.findIndex(x => x.id === payload.athlete.id)

    const athlete = state.athletes.splice(index, 1)
    state.athletes.unshift(athlete[0])
}

export const workout = function (state, {workout}) {
    // TODO: Fix this

    const athlete = state.athletes.findIndex(x => x.id === workout.athleteId)
    if (athlete === -1)
        return

    const date = new Date(workout.startDateTime)
    const index = sortedIndex(state.athletes[athlete].workouts.map(w => w.startDateTime), date)

    if (state.athletes[athlete].workouts[index].id === workout.id) {
        Vue.set(state.athletes[athlete].workouts, index, workout)
        return
    }

    Vue.set(state.athletes[athlete].workouts, index + 1, workout)
    // TODO: use splice

    // TODO: double check if this is needed
    // else if (index < state.athletes[athlete].workouts.length && state.athletes[athlete].workouts[index + 1].id === workout.id)
    // Vue.set(state.athletes[athlete].workouts, index + 1, workout)
}

export const workouts = function (state, {workouts}) {
    const athlete = state.athletes.findIndex(x => x.id === workouts[0].athleteId)
    if (athlete === -1)
        return

    state.athletes[athlete].workouts = workouts
}