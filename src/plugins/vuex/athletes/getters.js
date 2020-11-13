import {loggedIn} from "../profile/getters";
import {getWorkoutObjects} from "./athletes";

export const athletes = state => loggedIn(state) ? state.athletes : null
export const athlete = state => athleteId => athletes(state).find(x => x.id === athleteId)

export const workoutsMetadata = state => (athleteId, from, to) => {
    const ath = athlete(state)(athleteId)
    return getWorkoutObjects('workoutsMetadata', ath, from, to)
}

export const workouts = state => (athleteId, from, to) => {
    const ath = athlete(state)(athleteId)
    return getWorkoutObjects('workouts', ath, from, to)
}