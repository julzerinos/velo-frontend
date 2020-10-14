import {mutations} from '@/plugins/vuex/mutations'

describe('vuex/mutations', () => {
    test('logout', () => {
        const state = {
            profile: "testProfile"
        }

        mutations.logout(state)
        expect(state.profile).toBeNull()
    });

    test('login', () => {
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

    test('addResult', () => {
        const id = "123"
        const resultObject = {
            blame: "test",
            message: "testMessage"
        }
        const state = {
            results: {
                test: null
            }
        }

        mutations.setResult(state, {resultObject})

        expect(state.results.test).toEqual(resultObject)
    });

    test('removeResult', () => {
        const blame = "test"

        const state = {
            results: {
                test: {
                    blame: "test",
                    message: "testMessage"
                }
            }
        }

        mutations.removeResult(state, {blame})

        expect(state.results.test).toBeNull()
    });


});