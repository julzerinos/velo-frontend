import {get, post} from "../../requests/requests";

const base_url = 'http://localhost:8081'

export const register = function (
    {name, email, password},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `${base_url}/register`,
        {
            firstName: name.firstName,
            lastName: name.lastName,
            email: email,
            password: password
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
    {token, username},
    onSuccess = r => r,
    onFail = r => r
) {
    return get(
        `${base_url}/user`,
        {
            Authorization: token
        },
        {
            email: username
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
                token: token
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