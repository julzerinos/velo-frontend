const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
    data: () => ({
        nameRules: [
            v => !!v || "Required"
        ],
        emailRules: [
            v => !!v || "Required",
            v => email_regex.test(String(v).toLowerCase()) || "Invalid email format"
        ],
        passRules: [
            v => !!v || "Required",
            v => v.length >= 8 || "Password is too short",
            v => v.length <= 30 || "Password is too long",
            // v => /(?=.*[a-z])/.test(String(v)) || "Must contain lowercase letter",
            // v => /(?=.*[A-Z])/.test(String(v)) || "Must contain uppercase letter",
            // v => /(?=.*[0-9])/.test(String(v)) || "Must contain number",
            // v => /(?=.*[!@#$%^&*])/.test(String(v)) || "Must contain special character"
        ]
    })
}