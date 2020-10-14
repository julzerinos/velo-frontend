export default {
    methods: {
        addErrorAsync(blame, message, lifetime = -1) {
            this.$store.dispatch('setResultAsync', {
                blame: blame,
                type: "error",
                lifetime: lifetime,
                message: message
            }).then(r => r);
        },
        addSuccessAsync(blame, message, lifetime = -1) {
            this.$store.dispatch('setResultAsync', {
                blame: blame,
                type: "success",
                lifetime: lifetime,
                message: message
            }).then(r => r);
        }
    }
}