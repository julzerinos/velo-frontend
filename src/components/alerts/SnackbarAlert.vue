<template>
  <div class="text-center">
    <v-snackbar
            timeout="-1"
            v-model="compBoolResult"
            transition="fade-transition"
    >

      <v-progress-linear
              absolute
              bottom
              buffer-value="100"
              color="pink" height="5"
              v-model="snackbarTimer"
      ></v-progress-linear>

      {{message}}

      <template v-slot:action="{ attrs }">
        <v-btn
                @click="remove"
                color="pink"
                icon
                v-bind="attrs"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "SnackbarAlert",

        computed: {
            ...mapGetters({
                result: 'result'
            }),
            compBoolResult: {
                get() {
                    return this.result !== null
                },
                set() {
                    this.remove()
                }
            },
            message() {
                if (this.result === null)
                    return ''

                return `${this.result.blame} | ${this.result.message}`
            }
        },
        watch: {
            result: function (v) {
                clearTimeout(this.timeout)

                if (v === null)
                    return

                this.startTimer()
                this.timeout = setTimeout(() => {
                    this.remove()
                    clearInterval(this.interval)
                }, this.lifetime)
            }
        },
        data() {
            return {

                lifetime: 5000,
                snackbarTimer: 1,
                interval: null,

                timeout: null
            }
        },
        methods: {
            ...mapActions({
                remove: 'removeResultAsync'
            }),
            startTimer() {
                clearInterval(this.interval)
                this.snackbarTimer = 0

                this.interval = setInterval(() => {
                    if (this.snackbarTimer <= 100) {
                        this.snackbarTimer += 10
                        return
                    }

                    this.snackbarTimer = 0
                    clearInterval(this.interval)
                }, this.lifetime / 11);
            },
        }
    }
</script>

<style scoped>

</style>