import {getters} from "@/plugins/vuex/getters";

describe('vuex/results/getters', () => {
    test('results returns results if results exists', () => {
        const state = {
            result: {
                blame: "test",
                message: "test"
            }
        }

        const res = getters.result(state)
        expect(res).toHaveProperty('blame')
        expect(res).toHaveProperty('message')
        expect(res.blame).toBe("test")
        expect(res.message).toBe("test")
    });

    test('results returns null when results is null', () => {
        const state = {
            result: null
        }

        const res = getters.result(state)
        expect(res).toBeNull()
    });

});