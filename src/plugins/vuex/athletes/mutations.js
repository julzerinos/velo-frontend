import Vue from "vue";

export const athlete = function (state, payload) {
    const index = state.athletes.findIndex(x => x.id === payload.athlete.id)
    index === -1 ?
        state.athletes.push(payload.athlete) :
        Vue.set(state.profile.athletes, index, payload.athlete)
}

export const athletes = function (state, payload) {
    for (const ath of payload.athletes)
        athlete(state, {athlete: ath})
}

export const moveAthleteToFront = function (state, payload) {
    const index = state.athletes.findIndex(x => x.id === payload.athlete.id)

    const athlete = state.athletes.splice(index, 1)
    state.athletes.unshift(athlete[0])
}

function sortedIndex(array, value) {
    let low = 0,
        high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

export const workout = function (state, {workout}) {
    const athlete = state.athletes.findIndex(x => x.id === workout.athleteId)
    if (athlete === -1)
        return

    if (!('workouts' in state.athletes[athlete]))
        state.athletes[athlete]['workouts'] = []

    const date = new Date(workout.startDateTime)
    const index = sortedIndex(state.athletes[athlete].workouts.map(w => w.startDateTime), date)

    if (index < state.athletes[athlete].workouts.length && state.athletes[athlete].workouts[index].id === workout.id)
        Vue.set(state.athletes[athlete].workouts, index, workout)

        // else if (index < state.athletes[athlete].workouts.length && state.athletes[athlete].workouts[index + 1].id === workout.id)
    //     Vue.set(state.athletes[athlete].workouts, index + 1, workout)

    else
        state.athletes[athlete].workouts.splice(index, 0, workout)
}