import {get, post} from "../../requests/requests";


export const register = function (
    {name, email, password, captcha},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `/register`,
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
        `/authenticate`,
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
        `/user`,
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
        `/logout-user`,
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
        `/reset-password`,
        {
            email: email,
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const newPassword = function (
    {tokenId, password},
    onSuccess = r => r,
    onFail = r => r
) {
    return post(
        `/new-password`,
        {
            tokenId: tokenId,
            newPassword: password
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

