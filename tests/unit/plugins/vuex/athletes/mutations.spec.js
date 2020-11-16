import {mutations} from '@/plugins/vuex/mutations'

describe('vuex/athletes/mutations', () => {

    test('athlete add new athlete', () => {
        const state = {
            athletes: [
                {id: '123'}
            ]
        }
        const newAthlete = {
            id: 'xyz'
        }

        mutations.athlete(state, {athlete: newAthlete})
        expect(state.athletes[1]).toStrictEqual(newAthlete)
    });

    test('athlete replaces athlete with id', () => {
        const state = {
            athletes: [{id: '123', property: 1}]
        }
        const newAthlete = {id: '123', property: 2}

        mutations.athlete(state, {athlete: newAthlete})
        expect(state.athletes[0].property).toBe(2)
    });

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

    test('workouts does nothing if empty workouts parameter', () => {
        const state = {
            athletes: [
                {
                    id: '123',
                    workouts: [{
                        athleteId: '123',
                        id: 6,
                        startDateTime: 5
                    }]
                }
            ]
        }

        mutations.workouts(state, {workouts: []})
        expect(state.athletes[0].workouts).toStrictEqual([{
            athleteId: '123',
            id: 6,
            startDateTime: 5
        }])
        expect(state.athletes[0].workouts.length).toBe(1)
    });

    test('workouts does nothing if null workouts parameter', () => {
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

        mutations.workouts(state, {workouts: null})
        expect(state.athletes[0].workouts[0].id).toBe(6)
        expect(state.athletes[0].workouts.length).toBe(1)
    });

    test('workouts correctly selects athleteId if not given as parameter', () => {
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

        mutations.workouts(state, {workouts: [workout]})
        expect(state.athletes[0].workouts[0].id).toBe(5)
        expect(state.athletes[0].workouts.length).toBe(1)
    });

    test('workouts replaces current workouts', () => {
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

        mutations.workouts(state, {workouts: [workout]})
        expect(state.athletes[0].workouts).toStrictEqual([workout])
        expect(state.athletes[0].workouts.length).toBe(1)
    });
});