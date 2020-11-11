import {get, post} from "../../requests/requests";

const base_url = 'http://localhost:8081'

export const register = function (
    {name, email, password, captcha},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `${base_url}/register`,
        {
            firstName: name.firstName,
            lastName: name.lastName,
            email: email,
            password: password,
            captcha: captcha
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const authenticate = function (
    {email, password},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `${base_url}/authenticate`,
        {
            email: email,
            password: password
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const user = function (
    {token, email},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `${base_url}/user`,
        {
            Authorization: token
        },
        {
            email: email
        },
        (response) => {
            const {
                firstName, lastName, email,
                athleteUUIDs, profileImg,
                stravaConnected
            } = response.data

            response['profile'] = {
                name: {
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                athletes: athleteUUIDs,
                profileImagePath: profileImg,
                isStravaConnected: stravaConnected,
                token: token,
                dataBricks: {configs: [], bricks: []},
            }

            return onSuccess(response)
        },
        onFail
    )
}

export const logout = function (
    {token},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `${base_url}/logout-user`,
        {
            Authorization: token
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const reset = function (
    {email},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `${base_url}/reset-password`,
        {
            email: email,
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const workoutsMetadata = function (
    {athleteId, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `${base_url}/workouts-metadata`,
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

export const workout = function (
    {workoutId, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `${base_url}/workout`,
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
        `${base_url}/athlete`,
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
        `${base_url}/athlete/athletes`,
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
        `${base_url}/athlete/add-coach`,
        {coachEmail, Authorization: token},
        {},
        {},
        onSuccess,
        onFail
    )
}

export const stravaImport = function (
    {athleteId, from, to, token},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `${base_url}/strava/import`,
        {Authorization: token},
        {
            athleteId, beforeEpoch: to, afterEpoch: from
        },
        {},
        onSuccess,
        onFail
    )
}