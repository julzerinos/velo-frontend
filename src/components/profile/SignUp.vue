<template>
  <v-card shaped>

    <v-card-actions class="justify-center">
      <v-btn
              @click="openSignUp = !openSignUp"
              block
              text
      >
        Sign Up
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="openSignUp">
        <v-divider></v-divider>
        <v-card-title>Sign Up</v-card-title>
        <v-card-subtitle>Sign up to create your Velo™ App credentials.</v-card-subtitle>

        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col
                      cols="12"
                      md="6"
              >
                <v-text-field
                        :rules="nameRules"
                        label="First Name"
                        required
                        v-model="signupProfile.name.firstName"
                ></v-text-field>
              </v-col>

              <v-col
                      cols="12"
                      md="6"
              >
                <v-text-field
                        :rules="nameRules"
                        label="Last Name"
                        required
                        v-model="signupProfile.name.lastName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                      cols="12"
                      md="6"
              >
                <v-text-field
                        :rules="emailRules"
                        label="E-mail"
                        required
                        v-model="signupProfile.email"
                ></v-text-field>
              </v-col>

              <v-col
                      cols="12"
                      md="6"
              >
                <v-text-field
                        :rules="passRules"
                        label="Password"
                        required
                        type="password"
                        v-model="signupProfile.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>


        <v-alert color="error"
                 close-icon="highlight_off"
                 dismissible
                 v-model="alert"
        >
          {{(result('signup') || '').message}}
        </v-alert>

        <v-card-actions class="justify-center">
          <v-btn :disabled="!valid" :loading="waiting" @click="signup({profile: signupProfile})">
            Sign up
          </v-btn>

        </v-card-actions>

      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "SignUp",
        props: {
            redirected: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            athleteItems: ['Kornel Skórka', 'January Coach'],

            openSignUp: false,
            valid: false,

            signupProfile: {
                name: {
                    firstName: '',
                    lastName: ''
                },
                email: '',
                password: '',
            },

            waiting: false
        }),
        created() {
            this.openSignUp = this.redirected;
        },
        methods: {
            ...mapActions({
                removeResult: 'removeResultAsync'
            })
        },
        computed: {
            ...mapGetters({
                result: 'result'
            }),
            alert: {
                get() {
                    return this.result('signup') !== null
                },
                set(v) {
                    if (!v) {
                        this.removeResult({blame: 'signup'})
                    }
                }
            }
        }
    }

</script>

<style scoped>

</style>