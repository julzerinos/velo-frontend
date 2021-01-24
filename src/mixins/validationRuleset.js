const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const password_regex = {
    "a lowercase letter": /(?=.*[a-z])/,
    "an uppercase letter": /(?=.*[A-Z])/,
    "a number": /(?=.*[0-9])/,
    "a special character": /(?=.*[!@#$%^&*])/
}

const checkPassword = function (p) {
    const messages = []

    if (p.length < 8)
        messages.push("at least 8 characters")

    if (p.length > 30)
        messages.push("less than 30 characters")

    for (const [msg, regex] of Object.entries(password_regex)) {
        if (!regex.test(p))
            messages.push(msg)
    }

    return messages.length === 0 ? true : 'The password must contain the following: ' + messages.join(', ')
}

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
            v => checkPassword(v),
        ]
    })
}