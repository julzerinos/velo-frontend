<template>
  <v-card shaped>

    <v-card-actions class="justify-center">
      <v-btn
              @click="openSignIn = !openSignIn"
              block
              text
      >
        Sign In
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="openSignIn">
        <v-divider></v-divider>
        <v-card-title>Sign In</v-card-title>
        <v-card-subtitle>Sign in using your Velo™ App credentials.</v-card-subtitle>

        <v-form v-model="valid">
          <v-container>
            <v-row>

              <v-col
                      cols="12"
                      md="6"
              >
                <v-text-field
                        :rules="emailRules"
                        label="E-mail"
                        required
                        v-model="loginProfile.email"
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
                        v-model="loginProfile.password"
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
          {{result('login') ? result('login').message : ''}}
        </v-alert>

        <v-card-actions class="justify-center">
          <v-btn :disabled="!valid" @click="login({profile: loginProfile})">Sign in</v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "SignIn",
        props: {
            redirected: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            openSignIn: false,
            valid: false,

            loginProfile: {
                email: '',
                password: '',
            }
        }),
        created() {
            this.openSignIn = this.redirected;
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
                    return this.result('login') !== null
                },
                set(v) {
                    if (!v) {
                        this.removeResult({blame: 'login'})
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>