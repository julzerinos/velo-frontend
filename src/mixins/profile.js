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
        signup(profile) {
            console.log(profile)
            this.$store.commit('login', profile);
            // this.$post("/signup",
            //     () => {
            //         this.$store.commit('login', profile);
            //     },
            //     () => {
            //     }
            // )
        },
        login(profile) {
            this.$store.commit('login', this.$createMockProfile());
            // this.$post("/auth",
            //     () => {
            //         this.$store.commit('login', this.$createMockProfile());
            //     },
            //     () => {
            //     }
            // )
        },
        logout() {
            this.$store.commit('logout');
        },
    }
}