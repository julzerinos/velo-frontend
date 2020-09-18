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
                        v-model="createdProfile.name.firstName"
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
                        v-model="createdProfile.name.lastName"
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
                        v-model="createdProfile.email"
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
                        v-model="createdProfile.password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-card-actions class="justify-center">
          <v-btn :disabled="!valid" @click="signupWrapper" v-show="!openSignUpAdvanced">Sign up</v-btn>
          <v-btn
                  @click="openSignUpAdvanced = !openSignUpAdvanced"
                  text
          >
            Advanced
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="openSignUpAdvanced">
            <v-divider></v-divider>
            <v-card-subtitle>Advanced options</v-card-subtitle>


            <v-container>
              <v-row>
                <v-col
                        cols="12"
                        md="6"
                >
                  <v-autocomplete
                          :items="athleteItems"
                          chips
                          color="white"
                          label="Athletes"
                          multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="justify-center">
              <v-btn :disabled="!valid" @click="signupWrapper">Sign up</v-btn>
            </v-card-actions>
          </div>
        </v-expand-transition>

      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
    export default {
        name: "SignUp",
        props: {
            redirected: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            signupWrapper() {
                this.signup(this.createdProfile)
            }
        },
        data: () => ({
            athleteItems: ['Kornel Skórka', 'January Coach'],

            openSignUp: false,
            openSignUpAdvanced: false,
            valid: false,

            createdProfile: {

                name: {
                    firstName: '',
                    lastName: ''
                },
                email: '',
                password: '',
                athletes: []

            }
            // fName: '',
            // lName: '',
            // email: '',
            // password: '',
        }),
        computed: {},
        created() {
            this.openSignUp = this.redirected;
        }
    }

</script>

<style scoped>

</style>