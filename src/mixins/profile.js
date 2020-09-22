export default {
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        profile() {
            return this.$store.state.profile;
        },
    },
    methods: {
        signup(signupProfile) {
            console.log(signupProfile)
            this.$post(
                "http://localhost:8081/register",
                {
                    username: signupProfile.email,
                    password: signupProfile.password
                },
                {},
                (response) => {
                    console.log(response);
                    // this.$store.commit('login', signupProfile);
                },
                (response) => {
                    console.log(response);
                }
            )
        },
        login(loginProfile) {
            console.log(loginProfile);
            this.$post(
                "http://localhost:8081/authenticate",
                {
                    username: loginProfile.email,
                    password: loginProfile.password
                },
                {},
                (response) => {
                    console.log(response);
                    if ('Authorization' in response.headers)
                        this.$store.dispatch('loginAsync', {})
                            .then(
                                r => console.log(r),
                                r => console.log(r)
                            );
                },
                (response) => {
                    console.log(response);
                }
            )
        },
        logout() {
            this.$store.commit('logout');
        },
    }
}