<template>
  <div class="text-center ma-2">
    <v-snackbar
            v-model="lastAlert"
    >
      text

      <template v-slot:action="{ attrs }">
        <v-btn
                @click="snackbar = false"
                color="pink"
                text
                v-bind="attrs"
        >
          Close
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
        created() {
            const getResult = {
                ...mapGetters({
                    result: 'result'
                })
            }.result

            console.log(state.results)

            for (const result in state.results) {
                console.log(result)
                this.computed[result] = () => getResult(result)
                this.watch[result] = (v) => this.lastAlert = v
            }
        },
        data() {
            return {
                lastAlert: null
            }
        }
        ,
        watch: {
            signup: v => this.lastAlert = v,
            login: v => this.lastAlert = v,

        }
    }
</script>

<style scoped>

</style>