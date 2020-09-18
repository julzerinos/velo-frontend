export default {
    data: () => ({
        nameRules: [
            v => !!v || "Required."
        ],
        emailRules: [
            v => !!v || "Required.",
            v => {
                if (v.length < 1) return false;
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(v).toLowerCase()) || "Invalid email format";
            }
        ],
        passRules: [
            v => !!v || "Required.",
            v => v.length >= 8 || "Password is too short"
        ]
    })
}