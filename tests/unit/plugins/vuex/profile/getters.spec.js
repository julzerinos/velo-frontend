import {getters} from "@/plugins/vuex/getters";

describe('vuex/profile/getters', () => {
    test('loggedIn returns true when profile exists in state', () => {
        const state = {
            profile: "testProfile"
        }

        const res = getters.loggedIn(state)
        expect(res).toBeTruthy()
    });

    test('loggedIn returns false when profile does not exist in state', () => {
        const state = {
            profile: null
        }

        const res = getters.loggedIn(state)
        expect(res).toBeFalsy()
    });

    test('profile returns profile if profile exists', () => {
        const state = {
            profile: "testProfile"
        }

        const res = getters.profile(state)
        expect(res).toEqual(state.profile)
    });

    test('profile returns null when profile is null', () => {
        const state = {
            profile: null
        }

        const res = getters.profile(state)
        expect(res).toBeNull()
    });

});