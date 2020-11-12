import {loggedIn} from "../profile/getters";

export const athletes = state => loggedIn(state) ? state.athletes : null
export const athlete = state => athleteId => athletes(state).find(x => x.id === athleteId)

function getClosestIndices(a, x, side = 0) {
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

export const workouts = state => (athleteId, from, to) => {
    const workouts = athlete(state)(athleteId).workouts
    const start = getClosestIndices(workouts.map(w => w.startDateTime), from, 1)[1]
    const end = getClosestIndices(workouts.map(w => w.startDateTime), to, -1)[0]
    return workouts.slice(start, end > -1 ? end + 1 : 0)
}