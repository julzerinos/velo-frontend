export default {
    install(Vue, options) {
        Vue.createMockProfile = () => ({
            name: {
                firstName: "January",
                lastName: "Coach"
            },
            id: 123,
            email: "january@rozplaj.gov",
            athletes: [],
            profileImagePath: "https://i.ytimg.com/vi/b5mfWJXjtyQ/maxresdefault.jpg"
        });

        Vue.prototype.$createMockProfile = Vue.createMockProfile;
    }
}