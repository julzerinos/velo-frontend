import {mutations} from '@/plugins/vuex/mutations'

describe('vuex/profile/mutations', () => {

    test('setResult sets results to results parameter', () => {
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

    test('removeResult sets results to null', () => {
        const state = {
            result: {
                blame: "test",
                message: "testMessage"
            }
        }

        mutations.removeResult(state)

        expect(state.result).toBeNull()
    });

});
