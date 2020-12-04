import {mockTraining1} from './mockTraining1'
import {mockTraining2} from './mockTraining2'
import {mockTraining3} from './mockTraining3'

const athletes = [
    {
        "id": "cb7157c3-326b-4ac9-ac49-beff5748799a",
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
        workouts: [
            mockTraining1,
            mockTraining2,
            mockTraining3
        ]
    },
    {
        "id": "ab7157c3-326b-4ac9-ac49-beff5748799a",
        "email": "asd2@asd.asd",
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
        workouts: [
            mockTraining3,
            mockTraining2,
            mockTraining2,
            mockTraining2
        ]
    },
    {
        "id": "bb7157c3-326b-4ac9-ac49-beff5748799a",
        "email": "asd3@asd.asd",
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
        "workouts": [mockTraining1, mockTraining1, mockTraining1, mockTraining3],
    }
]

export default athletes