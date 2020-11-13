import {get, post} from "../../requests/requests";

export const getClosestIndices = function (a, x, formatter = t => t) {
    let lo = -1, hi = a.length;
    while (hi - lo > 1) {
        let mid = Math.round((lo + hi) / 2);
        if (formatter(a[mid]) <= x) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    if (a[lo] === x) hi = lo;

    return [lo, hi];
}

export const getWorkoutObjects = function (workoutObjects, athlete, start, end) {
    const wrkObj = athlete[workoutObjects] || []
    const startIndex = getClosestIndices(wrkObj.map(w => w.startDateTime), start, t => new Date(t))[1]
    const endIndex = getClosestIndices(wrkObj.map(w => w.startDateTime), end, t => new Date(t))[0]
    return wrkObj.slice(startIndex, endIndex > -1 ? endIndex + 1 : 0)
}

export const sortedIndex = function (array, value) {
    let low = 0,
        high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

export const workoutsMetadata = function (
    {athleteId, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `/workouts-metadata`,
        {
            Authorization: token
        },
        {
            athleteId: athleteId
        },
        onSuccess,
        onFail
    )
}
export const workouts = function (
    {athleteId, start, end, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `/workouts`,
        {
            Authorization: token
        },
        {
            athleteId,
            beforeEpoch: Date.now(),
            afterEpoch: 0
        },
        onSuccess,
        onFail
    )
}
export const workout = function (
    {workoutId, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `/workout`,
        {
            Authorization: token
        },
        {
            workoutId: workoutId
        },
        onSuccess,
        onFail
    )
}
export const athlete = function (
    {athleteId, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `/athlete`,
        {
            Authorization: token
        },
        {
            athleteEmail: athleteId
        },
        onSuccess,
        onFail
    )
}
export const athletes = function (
    {athleteIds, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `/athlete/athletes`,
        {
            Authorization: token,
            athleteIds: athleteIds
        },
        {},
        onSuccess,
        onFail
    )
}
export const addCoach = function (
    {coachEmail, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `/athlete/add-coach`,
        {coachEmail, Authorization: token},
        {},
        {},
        onSuccess,
        onFail
    )
}
export const stravaImport = function (
    {athleteId, start, end, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `/strava/import`,
        {Authorization: token},
        {
            athleteId, beforeEpoch: end, afterEpoch: start
        },
        {},
        onSuccess,
        onFail
    )
}