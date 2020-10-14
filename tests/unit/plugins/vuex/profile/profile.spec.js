import {authenticate, logout, register, reset, user} from "@/plugins/vuex/profile/profile";
import axios from 'axios'

jest.mock('axios')

// TODO: add jest post/get checks on url and parameters

describe('vuex/profile', () => {
    test('logout returns server response on request success', () => {
        expect.hasAssertions()

        axios.post.mockResolvedValueOnce({data: "logoutSuccess"});

        logout({token: "123"}, r => {
            expect(r.data).toBe("logoutSuccess")
        })
    });

    test('logout returns server response on request fail', () => {
        expect.hasAssertions()

        axios.post.mockRejectedValueOnce({data: "logoutFail"});

        logout({token: "123"}, null, r => expect(r.data).toBe("logoutFail"))
    });

    test('register returns server response on success', () => {
        expect.hasAssertions()

        axios.post.mockResolvedValueOnce({data: "registerSuccess"});

        const profile = {
            name: {firstName: "test1", lastName: "test2"},
            username: "test3",
            password: "test4"
        }

        return register(profile, r => {
            expect(r.data).toBe("registerSuccess")
        })
    });

    test('register returns server response on fail', () => {
        expect.hasAssertions()

        axios.post.mockRejectedValueOnce({data: "registerFail"});

        const profile = {
            name: {firstName: "test1", lastName: "test2"},
            username: "test3",
            password: "test4"
        }

        register(profile, null, r => {
            expect(r.data).toBe("registerFail")
        })
    });

    test('authenticate returns server response on success', () => {
        expect.hasAssertions()

        axios.post.mockResolvedValueOnce({data: "authSuccess"});

        const profile = {
            email: "a@b.c",
            password: "password"
        }

        return authenticate(profile, r => {
            expect(r.data).toBe("authSuccess")
        })
    });

    test('authenticate returns server response on fail', () => {
        expect.hasAssertions()

        axios.post.mockRejectedValueOnce({data: "authFail"});

        const profile = {
            email: "a@b.c",
            password: "password"
        }

        authenticate(profile, null, r => {
            expect(r).toHaveProperty('data')
            expect(r.data).toBe("authFail")
        })
    });

    test('user returns user profile together with server response on success', () => {
        expect.hasAssertions()

        axios.get.mockResolvedValueOnce({
            data: {
                firstName: "firstName", lastName: "lastName", email: "email",
                athleteUUIDs: [], profileImg: "profileImg",
                stravaConnected: true
            }
        });

        const token = "123"
        user({username: "abc", token: token},
            r => {
                expect(r).toHaveProperty('profile')
                expect(r.profile).toEqual({
                    name: {
                        firstName: "firstName",
                        lastName: "lastName"
                    },
                    email: "email",
                    athletes: [],
                    profileImagePath: "profileImg",
                    isStravaConnected: true,
                    token: token
                })
            }, null)
    });

    test('user returns server response on success', () => {
        expect.hasAssertions()

        axios.get.mockRejectedValue({
            data: "userFail"
        });

        const token = "123"
        user({username: "abc", token: token},
            null,
            r => {
                expect(r).toHaveProperty('data')
                expect(r.data).toBe("userFail")
            })
    });

    test('reset returns server response on success', () => {
        expect.hasAssertions()

        axios.post.mockResolvedValueOnce({data: "resetSuccess"});

        reset({email: "123"}, r => expect(r.data).toBe("resetSuccess"))
    });

    test('reset returns server response on fail', () => {
        expect.hasAssertions()

        axios.post.mockRejectedValueOnce({data: "resetFail"});

        reset({email: "123"}, null, r => expect(r.data).toBe("resetFail"))
    });

});