import jwt_decode from 'jwt-decode';
import {resultMessages} from "../plugins/dictionary/dictionary";
// TODO switch to vuex getters

export default {
    computed: {
        loggedIn() {
            return this.$store.state.profile !== null;
        },
        profile() {
            return this.$store.state.profile;
        },
    },
    methods: {
        signup(signupProfile) {
            this.$post(
                "http://localhost:8081/register",
                {
                    firstName: signupProfile.name.firstName,
                    lastName: signupProfile.name.lastName,
                    username: signupProfile.email,
                    password: signupProfile.password
                },
                {},
                (response) => {
                    this.addSuccessAsync("signup", "yes is signup good");
                },
                (response) => {
                    let message = resultMessages.connectionRefusedMessage.alert

                    if (response.code < 500 && response.code >= 400)
                        message = response.error.errors[0].message

                    this.addErrorAsync(
                        "signup",
                        message
                    );
                }
            )
        },
        login(loginProfile) {
            this.$post(
                "http://localhost:8081/authenticate",
                {
                    username: loginProfile.email,
                    password: loginProfile.password
                },
                {},
                (response) => {
                    let token;
                    if ((token = response.headers['authorization']) !== undefined) {
                        const decoded = jwt_decode(token);
                        // TODO: use decoded profile once fields are populated in BE
                        const profile = this.$createMockProfile();
                        profile.token = token;
                        this.$store.dispatch('loginAsync', profile).then(r => r);
                    }
                },
                (response) => {
                    this.addErrorAsync(
                        "signin",
                        resultMessages.connectionRefusedMessage.alert
                    );
                }
            )
        },
        logout(profile) {
            this.$store.dispatch('logoutAsync').then(r => r);
            this.$post(
                "http://localhost:8081/logout",
                {
                    authorization: profile.token
                },
                {},
                (response) => {
                    this.$store.dispatch('logoutAsync').then(r => r);
                },
                (response) => {
                    console.log(response);
                    // TODO: vuex error object for error handling
                }
            )
        },
    }
}