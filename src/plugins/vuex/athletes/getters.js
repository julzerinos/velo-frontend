import {loggedIn} from "../profile/getters";

export const athletes = state => loggedIn(state) ? state.athletes : null
export const athlete = state => athleteId => athletes(state).find(x => x.id === athleteId)

function getClosestIndices(a, x) {
    let lo = -1, hi = a.length;
    while (hi - lo > 1) {
        let mid = Math.round((lo + hi) / 2);
        if (a[mid] <= x) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (a[lo] === x) hi = lo;

    return [lo, hi];
}

function getWorkoutObjects(workoutObjects, athlete, from, to) {
    const wrkObj = athlete[workoutObjects]
    const start = getClosestIndices(wrkObj.map(w => w.startDateTime), from, 1)[1]
    const end = getClosestIndices(wrkObj.map(w => w.startDateTime), to, -1)[0]
    return wrkObj.slice(start, end > -1 ? end + 1 : 0)
}

export const workoutsMetadata = state => (athleteId, from, to) => {
    const athlete = athlete(state)(athleteId)
    return getWorkoutObjects('workoutsMetadata', athlete, from, to)
}

export const workouts = state => (athleteId, from, to) => {
    const athlete = athlete(state)(athleteId)
    return getWorkoutObjects('workouts', athlete, from, to)
}