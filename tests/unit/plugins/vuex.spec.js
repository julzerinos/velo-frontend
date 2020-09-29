import {mutations} from '@/plugins/vuex/vuex'

describe('mutations', () => {
    test('logout', () => {
        const state = {
            loggedIn: true,
            profile: "testProfile"
        }

        mutations.logout(state)
        expect(state.loggedIn).toBeFalsy()
        expect(state.profile).toBeNull()
    });

    test('login', () => {
        const profile = {
            name: "John",
            email: "jo@h.n"
        }
        const state = {
            loggedIn: false,
            profile: null
        }

        mutations.login(state, profile)

        expect(state.loggedIn).toBeTruthy()
        expect(state.profile).toEqual(profile)
    });

    test('addResult', () => {
        const id = "123"
        const resultObject = {
            blame: "test",
            message: "testMessage"
        }
        const state = {
            asyncResults: {
                test: {}
            }
        }

        mutations.addResult(state, {id: id, resultObject: resultObject})

        expect(state.asyncResults.test).toHaveProperty(id)
        expect(state.asyncResults.test[id]).toEqual(resultObject)
    });

    test('removeResult', () => {
        const id = "123"
        const blame = "test"

        const state = {
            asyncResults: {
                test: {
                    id: "testString"
                }
            }
        }

        mutations.removeResult(state, {blame: blame, id: id})

        expect(state.asyncResults.test).not.toHaveProperty(id)
        expect(state.asyncResults.test[id]).not.toBe("testString")
    });
});

// TODO: Figure out vuex actions tests
// https://vuex.vuejs.org/guide/testing.html

// const testAction = async (action, payload, state, expectedMutations, done) => {
//     let count = 0
//
//     const commit = (type, payload) => {
//         const mutation = expectedMutations[count]
//
//         try {
//             expect(type).toEqual(mutation.type)
//             expect(payload).toEqual(mutation.payload)
//         } catch (error) {
//             done(error)
//         }
//
//         count++
//         if (count >= expectedMutations.length) {
//             done()
//         }
//     }
//
//     await action({commit, state}, payload)
//
//     console.log(state)
//
//     if (expectedMutations.length === 0) {
//         expect(count).toBe(0)
//         done()
//     }
// }

// describe('actions', () => {


// test('logoutAsync', async done => {
//     const state = {
//         loggedIn: true,
//         profile: "testProfile"
//     }
//     await testAction(actions.logoutAsync, null, state, [{type: 'logout'}], done)
// });

// test('loginAsync', done => {
//     const state = {
//         loggedIn: true,
//         profile: "testProfile"
//     }
//     testAction(actions.logoutAsync, null, state, [{type: 'logout'}], done)
// });
// });

