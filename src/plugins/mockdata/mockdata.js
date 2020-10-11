export default {
    methods: {
        createMockProfile() {
            return {
                "name": {
                    "firstName": "January",
                    "lastName": "Coach"
                },
                "id": 123,
                "email": "january@rozplaj.gov",
                "athletes": [],
                "profileImagePath": "https://i.ytimg.com/vi/b5mfWJXjtyQ/maxresdefault.jpg"
            }
        }
    },

    install(Vue, options) {
        Vue.createMockProfile = this.methods.createMockProfile;

        Vue.prototype.$createMockProfile = Vue.createMockProfile;
    }
}