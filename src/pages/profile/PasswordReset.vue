<template>
  <div id="password-reset">

    <v-app-bar app>

      <v-spacer/>
      <v-toolbar-title class="app-name-title">
        <router-link style="text-decoration: none; color: inherit;" to="/maincontent">Velo</router-link>
      </v-toolbar-title>

      <v-spacer/>
    </v-app-bar>

    <v-main>

      <v-container fill-height fluid>
        <v-row align="center"
               justify="center">
          <v-col>

            <v-card-title>Reset password submission</v-card-title>

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
                            v-model="email"
                    ></v-text-field>
                  </v-col>

                </v-row>
                <v-btn :disabled="!valid">Submit</v-btn>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-container>

    </v-main>
  </div>
</template>

<script>
    export default {
        name: "PasswordReset",

        data: function () {
            return {
                valid: false,
                email: ''
            }
        },
        created() {
            this.email = this.emailParamCheck
        },
        props: {
            emailParam: {
                type: String,
                default: ''
            }
        },
        computed: {
            emailParamCheck() {
                if ('emailParam' in this.$route.query)
                    return this.$route.query.emailParam;
                else
                    return String(this.emailParam);
            }
        }
    }
</script>

<style scoped>

</style>