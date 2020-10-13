import {axiosMethods} from "@/plugins/requests/requests";

export const register = function (
    profile,
    onSuccess = r => r,
    onFail = r => r
) {
    return axiosMethods.post(
        "http://localhost:8081/register",
        {
            firstName: profile.name.firstName,
            lastName: profile.name.lastName,
            username: profile.email,
            password: profile.password
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const authenticate = function (
    profile,
    onSuccess = r => r,
    onFail = r => r
) {
    return axiosMethods.post(
        "http://localhost:8081/authenticate",
        {
            username: profile.email,
            password: profile.password
        },
        {},
        {},
        onSuccess,
        onFail
    )
}

export const user = function (
    profile,
    onSuccess = r => r,
    onFail = r => r
) {
    return axiosMethods.get(
        "http://localhost:8081/user",
        {
            Authorization: profile.token
        },
        {
            email: profile.username
        },
        (response) => {
            const {firstName, lastName, email, athleteUUIDs, profileImg} = response.data

            response['profile'] = {
                name: {
                    firstName: firstName,
                    lastName: lastName
                },
                id: "id",
                email: email,
                athletes: athleteUUIDs,
                profileImagePath: profileImg,
                isStravaConnected: false,
                token: profile.token
            }

            return onSuccess(response)
        },
        onFail
    )
}

export const logout = function (
    profile,
    onSuccess = r => r,
    onFail = r => r
) {
    return axiosMethods.post(
        "http://localhost:8081/logout",
        {
            authorization: profile.token
        },
        {},
        {},
        onSuccess,
        onFail
    )
}
