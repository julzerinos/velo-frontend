import {mapActions, mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters({
            loggedIn: 'loggedIn',
            profile: 'profile',
            athletes: 'athletes'
        })
    },
    methods: {
        ...mapActions({
            signup: 'signupAsync',
            login: 'loginAsync',
            logout: 'logoutAsync',
            workout: 'workoutAsync'
        }),

        fullName: obj => `${obj.firstName} ${obj.lastName}`
    }
}