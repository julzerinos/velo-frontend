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
            <v-row>
              <v-col>
                <v-fade-transition>
                  <captcha :refresh-trigger="captchaTrigger" @verify="captchaVerified" v-show="valid"/>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-container>
        </v-form>


        <v-card-actions class="justify-center">
          <v-btn
                  :disabled="!valid || !captcha"
                  :loading="loading"
                  @click="submit"
          >
            Sign up
          </v-btn>

        </v-card-actions>

      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
    import Captcha from "./Captcha";

    export default {
        name: "SignUp",
        components: {Captcha},
        props: {
            redirected: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                openSignUp: this.redirected,

                captchaTrigger: 0,
                captcha: false,

                valid: false,
                loading: false,

                signupProfile: {
                    name: {
                        firstName: '',
                        lastName: ''
                    },
                    email: '',
                    password: '',
                    captcha: ''
                },
            }
        },
        watch: {
            redirected: function (val) {
                this.openSignUp = val
            }
        },
        methods: {
            captchaVerified: function (response) {
                this.captcha = true
                this.signupProfile.captcha = response
            },
            submit: function () {
                const onFail = () => {
                    this.loading = false
                    this.captchaTrigger++
                }
                const onSuccess = () => {
                    onFail()
                    this.openSignUp = false
                    this.$emit('change')
                }

                this.loading = true

                this.signup({
                    profile: this.signupProfile,
                    onSuccess: onSuccess.bind(this),
                    onFail: onFail.bind(this)
                })
            }
        }
    }

</script>

<style scoped>

</style>