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

    // test('data-bricks returns empty array when no data-bricks are stored', () => {
    //     const state = {
    //         data-bricks: []
    //     }
    //
    //     const res = getters.data-bricks(state)
    //     expect(res).toHaveLength(0)
    //     expect(res).toEqual([])
    // });
    //
    // test('data-bricks returns array of data-bricks configs when data-bricks are nonempty', () => {
    //     const state = {
    //         data-bricks: [{
    //             brickConfig: "test",
    //             dataConfig: "test"
    //         }]
    //     }
    //
    //     const res = getters.data-bricks(state)
    //     expect(res).toHaveLength(1)
    //     expect(res[0]).toHaveProperty('brickConfig')
    //     expect(res[0]).toHaveProperty('dataConfig')
    //     expect(res[0].brickConfig).toBe('test')
    //     expect(res[0].dataConfig).toBe('test')
    // });

    test('athlete returns athlete object when it exists', () => {
        const state = {
            athletes: [{
                id: '123',
                workouts: [{
                    id: 4,
                    startDateTime: 4
                }]
            }]
        }

        const res = getters.athlete(state)('123')
        expect(res).toStrictEqual({
            id: '123',
            workouts: [{
                id: 4,
                startDateTime: 4
            }]
        })
    });

    test('workouts returns workouts in defined range - intersection', () => {
        const state = {
            athletes: [{
                id: '123',
                workouts: [{
                    id: 4,
                    startDateTime: 4
                }, {
                    id: 5,
                    startDateTime: 5
                }, {
                    id: 6,
                    startDateTime: 6
                }]
            }]
        }

        const res = getters.workouts(state)('123', 3, 5)
        expect(res).toStrictEqual([{
            id: 4, startDateTime: 4
        }, {
            id: 5,
            startDateTime: 5
        }])
    });

    test('workouts returns workouts in defined range - full overlap', () => {
        const state = {
            athletes: [{
                id: '123',
                workouts: [{
                    id: 4,
                    startDateTime: 4
                }, {
                    id: 5,
                    startDateTime: 5
                }, {
                    id: 6,
                    startDateTime: 6
                }]
            }]
        }

        const res = getters.workouts(state)('123', 3, 7)
        expect(res).toStrictEqual([{
            id: 4,
            startDateTime: 4
        }, {
            id: 5,
            startDateTime: 5
        }, {
            id: 6,
            startDateTime: 6
        }])
    });

    test('workouts returns workouts in defined range - lower edge', () => {
        const state = {
            athletes: [{
                id: '123',
                workouts: [{
                    id: 4,
                    startDateTime: 4
                }, {
                    id: 5,
                    startDateTime: 5
                }, {
                    id: 6,
                    startDateTime: 6
                }]
            }]
        }

        const res = getters.workouts(state)('123', 2, 4)
        expect(res).toStrictEqual([{
            id: 4,
            startDateTime: 4
        }])
    });

    test('workouts returns workouts in defined range - upper edge', () => {
        const state = {
            athletes: [{
                id: '123',
                workouts: [{
                    id: 4,
                    startDateTime: 4
                }, {
                    id: 5,
                    startDateTime: 5
                }, {
                    id: 6,
                    startDateTime: 6
                }]
            }]
        }

        const res = getters.workouts(state)('123', 6, 10)
        expect(res).toStrictEqual([{
            id: 6,
            startDateTime: 6
        }])
    });

    test('workouts returns empty array when no workouts in defined range - above', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        id: 4,
                        startDateTime: 4
                    }, {
                        id: 5,
                        startDateTime: 5
                    }, {
                        id: 6,
                        startDateTime: 6
                    }]
                }
            ]
        }

        const res = getters.workouts(state)('123', 7, 10)
        expect(res).toStrictEqual([])
    });

    test('workouts returns empty array when no workouts in defined range - below', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        id: 4,
                        startDateTime: 4
                    }, {
                        id: 5,
                        startDateTime: 5
                    }, {
                        id: 6,
                        startDateTime: 6
                    }]
                }
            ]
        }

        const res = getters.workouts(state)('123', 0, 3)
        expect(res).toStrictEqual([])
    });


});