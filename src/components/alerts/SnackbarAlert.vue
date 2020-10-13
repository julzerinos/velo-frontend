<template>
  <div class="text-center ma-2">
    <v-snackbar
            timeout="10000"
            v-model="show"
    >

      {{message}}

      <template v-slot:action="{ attrs }">
        <v-btn
                @click="show = false"
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
    import {mapGetters} from "vuex";
    import {state} from "@/plugins/vuex/state"

    export default {
        name: "SnackbarAlert",

        computed: {
            ...mapGetters({
                results: 'results'
            }),
            message() {
                if (this.lastAlert === null)
                    return ''

                return `${this.lastAlert.blame} | ${this.lastAlert.message}`
            }
        },
        created() {
            for (const r in state.results)
                this.$watch(`results.${r}`, function (v) {
                    this.lastAlert = v
                    this.show = true
                })
        },
        data() {
            return {
                show: false,
                lastAlert: null,
            }
        }

    }
</script>

<style scoped>

</style>