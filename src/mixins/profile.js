import {mapActions, mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters({
            loggedIn: 'loggedIn',
            profile: 'profile'
        })
    },
    methods: {
        ...mapActions({
            signup: 'signupAsync',
            login: 'loginAsync',
            logout: 'logoutAsync'
        }),
    }
}