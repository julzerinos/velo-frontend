import {mutations} from '@/plugins/vuex/mutations'

describe('vuex/profile/mutations', () => {
    test('logout sets profile to null', () => {
        const state = {
            profile: "testProfile"
        }

        mutations.logout(state)
        expect(state.profile).toBeNull()
    });

    test('login sets profile to profile parameter', () => {
        const profile = {
            name: "a",
            email: "a@b.c"
        }
        const state = {
            profile: null
        }

        mutations.login(state, {profile})

        expect(state.profile).toEqual(profile)
    });

    test('profileChangeProperty changes profile property if the property exists', () => {
        const state = {
            profile: {
                property: "value"
            }
        }

        mutations.profileChangeProperty(state, {property: "property", value: "value2"})

        expect(state.profile.property).toBe("value2")
    });

    test('profileChangeProperty does not do anything if the property does not exist', () => {
        const state = {
            profile: {
                property1: "value"
            }
        }

        mutations.profileChangeProperty(state, {property: "property2", value: "value"})

        expect(state.profile).not.toHaveProperty("property2")
        expect(Object.keys(state.profile)).toHaveLength(1)
        expect(Object.keys(state.profile)[0]).toBe("property1")
        expect(state.profile.property1).toBe("value")
    });

});