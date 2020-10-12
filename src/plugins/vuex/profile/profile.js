import jwt_decode from 'jwt-decode';

import {axiosMethods} from "@/plugins/requests/requests";

export const signup = async function (
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
        onSuccess,
        onFail
    )
}

export const login = async function (
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
        (response) => {
            let token;
            if ((token = response.headers['authorization']) !== undefined) {
                const decoded = jwt_decode(token);
                console.log(decoded)
                // TODO: use decoded profile once fields are populated in BE
                const profile = {
                    name: {
                        firstName: "firstName",
                        lastName: "lastName"
                    },
                    id: "id",
                    email: decoded.sub,
                    athletes: [],
                    profileImagePath: null,
                    isStravaConnected: false,
                    token: token
                }
                profile.token = token;
                response['profile'] = profile
                // this.$store.dispatch('loginAsync', profile).then(r => r);

                onSuccess(response)

                return response
            }
        },
        onFail
    )
}

export const logout = async function (
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
        onSuccess,
        onFail
    )
}
