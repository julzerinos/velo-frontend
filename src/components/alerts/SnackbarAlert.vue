<template>
  <div class="text-center ma-2">
    <v-snackbar
            :timeout="timeout"
            v-model="compBoolResult"
    >

      {{message}}


      <template v-slot:action="{ attrs }">
        <v-progress-circular
                :value="snackbarTimer"
                color="pink"
        >
          <v-btn
                  @click="remove"
                  color="pink"
                  icon
                  v-bind="attrs"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-progress-circular>
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
                    this.stopTimer()
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
                this.startTimer()
            }
        },
        data() {
            return {

                timeout: 8000,
                snackbarTimer: 0,
                timerId: null
            }
        },
        methods: {
            ...mapActions({
                remove: 'removeResultAsync'
            }),
            startTimer() {
                const frame = function () {
                    this.snackbarTimer += 1
                }
                this.timerId = setInterval(frame.bind(this), this.timeout / 100);
            },
            stopTimer() {
                clearInterval(this.timerId)
                this.timerId = null
                this.snackbarTimer = 0
            }
        }
    }
</script>

<style scoped>

</style>