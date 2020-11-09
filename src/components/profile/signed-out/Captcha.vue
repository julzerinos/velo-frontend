<template>
  <div>
    <form action="?" method="POST">
      <div id="recaptcha"></div>
    </form>
  </div>
</template>

<script>
    export default {
        name: "Captcha",
        data() {
            return {
                sitekey: '6Lf6Ft8ZAAAAAOnVa7yuTynm62gKBBlwegcGSIU2',
                widgetId: 0
            }
        },
        methods: {
            initReCaptcha: function () {
                const self = this;
                setTimeout(function () {
                    window.grecaptcha.render('recaptcha', {
                        'sitekey': '6Lf6Ft8ZAAAAAOnVa7yuTynm62gKBBlwegcGSIU2',
                        badge: 'inline',
                        callback: (response) => {
                            self.$emit('verify', response)
                        }
                    });
                }, 500);
            },
        },
        created() {
            this.initReCaptcha()
        },
    }

</script>

<style scoped>

</style>