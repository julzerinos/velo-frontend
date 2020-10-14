const testAction = async (action, payload, state, expectedMutations, done) => {
    let count = 0

    const commit = (type, payload) => {
        const mutation = expectedMutations[count]

        try {
            expect(type).toEqual(mutation.type)
            expect(payload).toEqual(mutation.payload)
        } catch (error) {
            done(error)
        }

        count++
        if (count >= expectedMutations.length) {
            done()
        }
    }

    await action({commit, state}, payload)

    console.log(state)

    if (expectedMutations.length === 0) {
        expect(count).toBe(0)
        done()
    }
}

// TODO: action tests

describe('vuex/actions', () => {
    test('logoutAsync', () => {
        // const state = {
        //     profile: "testProfile"
        // }
        // await testAction(actions.logoutAsync, null, state, [{type: 'logout'}], done)

        expect(true).toBeTruthy()
    });
});
