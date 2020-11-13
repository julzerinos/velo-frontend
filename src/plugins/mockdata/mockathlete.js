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
    }
]

export default athletes