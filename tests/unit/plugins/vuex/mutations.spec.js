import {mutations} from '@/plugins/vuex/mutations/mutations'

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
                    workouts: [{startDateTime: 0}, {startDateTime: 1}, {startDateTime: 3}, {startDateTime: 4}]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            startDateTime: 2
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(5)
        expect(state.athletes[0].workouts[2]).toStrictEqual(workout)
        expect(state.athletes[0].workouts).toStrictEqual([{startDateTime: 0}, {startDateTime: 1}, workout, {startDateTime: 3}, {startDateTime: 4}])
    });

    test('workout places workout at proper index - end', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{startDateTime: 0}, {startDateTime: 1}, {startDateTime: 3}, {startDateTime: 4}]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            startDateTime: 5
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(5)
        expect(state.athletes[0].workouts[4]).toStrictEqual(workout)
        expect(state.athletes[0].workouts).toStrictEqual([{startDateTime: 0}, {startDateTime: 1}, {startDateTime: 3}, {startDateTime: 4}, workout])
    });

    test('workout places workout at proper index - start', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{startDateTime: 1}, {startDateTime: 2}, {startDateTime: 3}, {startDateTime: 4}]
                }
            ]
        }
        const workout = {
            athleteId: '123',
            startDateTime: 0
        }

        mutations.workout(state, {workout})
        expect(state.athletes[0].workouts.length).toBe(5)
        expect(state.athletes[0].workouts[0]).toStrictEqual(workout)
        expect(state.athletes[0].workouts).toStrictEqual([workout, {startDateTime: 1}, {startDateTime: 2}, {startDateTime: 3}, {startDateTime: 4}])
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
            athleteId: '123',
            startDateTime: 10
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
});