import {mapActions, mapGetters} from "vuex";
import jwt from "jwt-decode";


export default {
    computed: {
        ...mapGetters({
            loggedIn: 'loggedIn',
            profile: 'profile',
            token: 'token',
            hasToken: 'hasToken'
        })
    },
    methods: {
        ...mapActions({
            signup: 'signupAsync',
            login: 'loginAsync',
            loginFromToken: 'userAsync',
            logout: 'logoutAsync',
        }),

        fullName: obj => `${obj.firstName} ${obj.lastName}`,

        loadFromToken() {
            if (!this.hasToken)
                return

            const email = jwt(this.token).sub
            this.loginFromToken({profile: {email, token: this.token}})
        }
    }
}