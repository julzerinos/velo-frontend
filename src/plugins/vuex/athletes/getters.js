import {loggedIn} from "../profile/getters";
import {getWorkoutObjects} from "./athletes";

export const athletes = state => loggedIn(state) ? state.athletes : null
export const athlete = state => athleteId => athletes(state).find(x => x.id === athleteId)

export const workoutsMetadata = state => (athleteId, start = 0, end = Date.now()) => {
    const ath = athlete(state)(athleteId)
    return getWorkoutObjects('workoutsMetadata', ath, start, end)
}

export const workouts = state => (athleteId, start = 0, end = Date.now()) => {
    const ath = athlete(state)(athleteId)
    return getWorkoutObjects('workouts', ath, start, end)
}