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

                <pass-reset-modal/>

              </v-col>
            </v-row>
            <!--            <v-row>-->
            <!--              <v-col>-->
            <!--                <v-fade-transition>-->
            <!--                  <captcha v-show="valid" @verify="captcha = true"/>-->
            <!--                </v-fade-transition>-->
            <!--              </v-col>-->
            <!--            </v-row>-->
          </v-container>
        </v-form>

        <v-card-actions class="justify-center">
          <v-btn
                  :disabled="!valid"
                  :loading="loading"
                  @click="submit"
          >
            Sign in
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
    import PassResetModal from "../password/PassResetModal";
    // import Captcha from "./Captcha";

    export default {
        name: "SignIn",
        components: {
            PassResetModal,
            // Captcha
        },
        props: {
            redirected: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                openSignIn: this.redirected,

                // captcha: false,
                valid: false,
                loading: false,

                loginProfile: {
                    email: '',
                    password: '',
                }
            }
        },
        watch: {
            redirected: function (val) {
                this.openSignIn = val
            }
        },
        methods: {
            submit: function () {
                const onFinish = () => this.loading = false

                this.loading = true

                this.login({
                    profile: this.loginProfile,
                    onSuccess: onFinish.bind(this),
                    onFail: onFinish.bind(this)
                })
            }
        }
    }
</script>

<style scoped>

</style>