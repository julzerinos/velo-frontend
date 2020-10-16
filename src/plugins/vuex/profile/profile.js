import {get, post} from "../../requests/requests";

export const register = function (
    {name, email, password},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        "http://localhost:8081/register",
        {
            firstName: name.firstName,
            lastName: name.lastName,
            username: email,
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
        "http://localhost:8081/authenticate",
        {
            username: email,
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
        "http://localhost:8081/user",
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
        "http://localhost:8081/logout-user",
        {
            authorization: token
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
        "http://localhost:8081/reset-password",
        {
            email: email,
        },
        {},
        {},
        onSuccess,
        onFail
    )
}
