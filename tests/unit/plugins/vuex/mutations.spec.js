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

    // test('addDataBrick pushes a data brick to data-bricks array', () => {
    //     const state = {
    //         data-bricks: []
    //     }
    //
    //     mutations.addDataBrick(state, {brickConfig: "brick", dataConfig: "data"})
    //
    //     expect(state.data-bricks).toHaveLength(1)
    //     expect(state.data-bricks[0]).toHaveProperty('brickConfig')
    //     expect(state.data-bricks[0]).toHaveProperty('dataConfig')
    //     expect(state.data-bricks[0].brickConfig).toBe('brick')
    //     expect(state.data-bricks[0].dataConfig).toBe('data')
    // });

    test('workout places workout at proper index - middle', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [
                        {id: 0, startDateTime: 0},
                        {id: 1, startDateTime: 1},
                        {id: 3, startDateTime: 3},
                        {id: 4, startDateTime: 4}
                    ]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 2,
            startDateTime: 2
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(5)
        expect(state.athletes[0].workouts[2]).toStrictEqual(workout)
        expect(state.athletes[0].workouts).toStrictEqual([
            {id: 0, startDateTime: 0},
            {id: 1, startDateTime: 1},
            workout,
            {id: 3, startDateTime: 3},
            {id: 4, startDateTime: 4}
        ])
    });

    test('workout places workout at proper index - end', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [
                        {id: 0, startDateTime: 0},
                        {id: 1, startDateTime: 1},
                        {id: 3, startDateTime: 3},
                        {id: 4, startDateTime: 4}
                    ]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 5,
            startDateTime: 5
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(5)
        expect(state.athletes[0].workouts[4]).toStrictEqual(workout)
        expect(state.athletes[0].workouts).toStrictEqual([
            {id: 0, startDateTime: 0},
            {id: 1, startDateTime: 1},
            {id: 3, startDateTime: 3},
            {id: 4, startDateTime: 4},
            workout
        ])
    });

    test('workout places workout at proper index - start', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [
                        {id: 1, startDateTime: 1},
                        {id: 2, startDateTime: 2},
                        {id: 3, startDateTime: 3},
                        {id: 4, startDateTime: 4}
                    ]
                }
            ]
        }
        const workout = {athleteId: '123', id: 0, startDateTime: 0}

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(5)
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
        expect(state.athletes[0].workouts).toStrictEqual([
            workout,
            {id: 1, startDateTime: 1},
            {id: 2, startDateTime: 2},
            {id: 3, startDateTime: 3},
            {id: 4, startDateTime: 4}
        ])
    });

    test('workout adds workouts if workouts do not exist in athlete', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                }
            ]
        }
        const workout = {
            id: 'xyz',
            athleteId: '123',
            startDateTime: 10
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0]).toHaveProperty('workouts')
        expect(state.athletes[0].workouts.length).toBe(1)
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
    });

    test('workout adds workout to empty workouts', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: []
                }
            ]
        }
        const workout = {
            id: 'xyz',
            athleteId: '123',
            startDateTime: 7
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0]).toHaveProperty('workouts')
        expect(state.athletes[0].workouts.length).toBe(1)
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
    });

    test('workout returns if does not find athlete with id', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: []
                }
            ]
        }
        const workout = {
            athleteId: 'xyz',
            startDateTime: 5
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(0)
    });

    test('workout replaces workout if already in array - 1 workout', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        athleteId: '123',
                        id: 4,
                        startDateTime: 5
                    }]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 4,
            startDateTime: 5
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
        expect(state.athletes[0].workouts.length).toBe(1)
    });

    test('workout replaces workout if already in array - replace first out of two', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        athleteId: '123',
                        id: 4,
                        startDateTime: 5
                    }, {
                        athleteId: '123',
                        id: 5,
                        startDateTime: 6
                    }]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 4,
            startDateTime: 5
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
        expect(state.athletes[0].workouts.length).toBe(2)
    });

    test('workout replaces workout if already in array - replace second out of two', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        athleteId: '123',
                        id: 4,
                        startDateTime: 5
                    }, {
                        athleteId: '123',
                        id: 5,
                        startDateTime: 6
                    }]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 5,
            startDateTime: 6
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts[1]).toStrictEqual(workout)
        expect(state.athletes[0].workouts.length).toBe(2)
    });

    test('workout replaces workout if already in array - replace middle of three', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        athleteId: '123',
                        id: 4,
                        startDateTime: 5
                    }, {
                        athleteId: '123',
                        id: 5,
                        startDateTime: 6
                    }, {
                        athleteId: '123',
                        id: 6,
                        startDateTime: 7
                    }]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 5,
            startDateTime: 6
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts[1]).toStrictEqual(workout)
        expect(state.athletes[0].workouts.length).toBe(3)
    });

    test('workout correctly parses date', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        athleteId: '123',
                        id: 6,
                        startDateTime: Date.now()
                    }]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            id: 5,
            startDateTime: '2020-11-11T12:44:43'
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
        expect(state.athletes[0].workouts.length).toBe(2)
    });
});