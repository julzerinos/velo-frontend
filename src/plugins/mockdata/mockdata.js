import mocktraining from './mocktraining'
import athletes from "./mockathlete";

export const createMockProfile = function () {
    return {
        "name": {
            "firstName": "January",
            "lastName": "Coach"
        },
        "id": 123,
        "email": "january@rozplaj.gov",
        "athletes": [],
        "profileImagePath": "https://i.ytimg.com/vi/b5mfWJXjtyQ/maxresdefault.jpg",
        "isStravaConnected": false
    }
}

export default {
    install(Vue, options) {
        Vue.createMockProfile = createMockProfile;
        Vue.mockTraining = function () {
            return mocktraining
        }
        Vue.mockAthletes = () => athletes

        Vue.prototype.$createMockProfile = Vue.createMockProfile;
        Vue.prototype.$mockTraining = Vue.mockTraining;
        Vue.prototype.$mockAthletes = Vue.mockAthletes;
    }
}