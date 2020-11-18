import mockTraining from "./mocktraining";

const athletes = [
    {
        name: "athlete1",
        workoutsMetadata: [],
        workouts: [
            mockTraining,
            mockTraining,
            mockTraining
        ]
    },
    {
        name: "athlete2",
        trainings: [
            mockTraining,
            mockTraining
        ]
    },
    {
        "id": "bb7157c3-326b-4ac9-ac49-beff5748799a",
        "email": "asd1@asd.asd",
        "firstName": "firstName",
        "lastName": "lastName",
        "age": 21,
        "maxHeartRate": null,
        "gender": null,
        "height": null,
        "weights": {},
        "ftps": {},
        "thresholdHeartRates": {},
        "stravaConnected": true,
        "workouts": [mockTraining, mockTraining, mockTraining],
    }
]

export default athletes