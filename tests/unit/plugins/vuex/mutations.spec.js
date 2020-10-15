import {mutations} from '@/plugins/vuex/mutations'

describe('vuex/mutations', () => {
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

    test('setResult sets result to result parameter', () => {
        const resultObject = {
            blame: "test",
            message: "testMessage"
        }
        const state = {
            result: null
        }

        mutations.setResult(state, {resultObject})

        expect(state.result).not.toBeNull()
        expect(state.result).toEqual(resultObject)
    });

    test('removeResult sets result to null', () => {
        const state = {
            result: {
                blame: "test",
                message: "testMessage"
            }
        }

        mutations.removeResult(state)

        expect(state.result).toBeNull()
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

    test('addDataBrick pushes a data brick to dataBricks array', () => {
        const state = {
            dataBricks: []
        }

        mutations.addDataBrick(state, {brickConfig: "brick", dataConfig: "data"})

        expect(state.dataBricks).toHaveLength(1)
        expect(state.dataBricks[0]).toHaveProperty('brickConfig')
        expect(state.dataBricks[0]).toHaveProperty('dataConfig')
        expect(state.dataBricks[0].brickConfig).toBe('brick')
        expect(state.dataBricks[0].dataConfig).toBe('data')
    });
});