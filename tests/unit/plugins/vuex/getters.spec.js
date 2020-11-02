import {getters} from "@/plugins/vuex/getters";

describe('vuex/getters', () => {
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

    test('result returns result if result exists', () => {
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

    test('result returns null when result is null', () => {
        const state = {
            result: null
        }

        const res = getters.result(state)
        expect(res).toBeNull()
    });

    // test('dataBricks returns empty array when no dataBricks are stored', () => {
    //     const state = {
    //         dataBricks: []
    //     }
    //
    //     const res = getters.dataBricks(state)
    //     expect(res).toHaveLength(0)
    //     expect(res).toEqual([])
    // });
    //
    // test('dataBricks returns array of dataBricks configs when dataBricks are nonempty', () => {
    //     const state = {
    //         dataBricks: [{
    //             brickConfig: "test",
    //             dataConfig: "test"
    //         }]
    //     }
    //
    //     const res = getters.dataBricks(state)
    //     expect(res).toHaveLength(1)
    //     expect(res[0]).toHaveProperty('brickConfig')
    //     expect(res[0]).toHaveProperty('dataConfig')
    //     expect(res[0].brickConfig).toBe('test')
    //     expect(res[0].dataConfig).toBe('test')
    // });
});