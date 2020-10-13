import {getters} from "@/plugins/vuex/getters";

describe('vuex/getters', () => {
    test('loggedIn when profile exists', () => {
        const state = {
            profile: "testProfile"
        }

        const res = getters.loggedIn(state)
        expect(res).toBeTruthy()
    });

    test('loggedIn when profile is null', () => {
        const state = {
            profile: null
        }

        const res = getters.loggedIn(state)
        expect(res).toBeFalsy()
    });

    test('profile when profile exists', () => {
        const state = {
            profile: "testProfile"
        }

        const res = getters.profile(state)
        expect(res).toEqual(state.profile)
    });

    test('profile when profile is null', () => {
        const state = {
            profile: null
        }

        const res = getters.profile(state)
        expect(res).toBeNull()
    });

    test('result when exists', () => {
        const state = {
            results: {
                blame: "test"
            }
        }

        const res = getters.result(state)('blame')
        expect(res).toBe("test")
    });

    test('result when null', () => {
        const state = {
            results: {
                blame: null
            }
        }

        const res = getters.result(state)('blame')
        expect(res).toBeNull()
    });

    test('result when wrong blame', () => {
        const state = {
            results: {
                blame1: "test"
            }
        }

        const res = getters.result(state)('blame2')
        expect(res).toBeUndefined()
    });
});