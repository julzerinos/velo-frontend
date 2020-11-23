import {getters} from "@/plugins/vuex/getters";

describe('vuex/athletes/getters', () => {
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