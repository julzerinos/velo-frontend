<template>
  <v-dialog
          v-model="dialog"
          width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
              :x-small="true"
              absolute
              color="blue"
              right text
              v-on="on"
      >
        Forgot your password?
      </v-btn>
    </template>

    <v-card>
      <v-card-title
              class="headline justify-center"
              primary-title
      >
        Password Reset
      </v-card-title>


      <v-card-text>

        Enter your email below to receive a new password.

        <v-form v-model="valid">
          <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  required
                  v-model="email"
          ></v-text-field>
        </v-form>
      </v-card-text>


      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
                @click="dialog = false"
                color="pink"
                dark
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
                :loading="loading"
                @click="submit()"
                color="primary"
                :disabled="!valid"
        >
          Submit
        </v-btn>
        <v-spacer></v-spacer>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "PassResetModal",
        data() {
            return {
                dialog: false,
                valid: false,
                email: '',
                loading: false
            }
        },
        methods: {
            ...mapActions({
                resetPassword: 'resetPasswordAsync'
            }),

            submit() {
                this.loading = true

                const onFinish = function () {
                    this.loading = false;
                }

                this.resetPassword({
                    email: this.email,
                    onSuccess: onFinish.bind(this),
                    onFail: onFinish.bind(this)
                })

            }
        }
    }
</script>

<style scoped>

</style>