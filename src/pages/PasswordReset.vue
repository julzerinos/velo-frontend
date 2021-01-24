<template>
  <v-card>

    <v-divider></v-divider>
    <v-card-title>Reset Your Password</v-card-title>
    <v-card-subtitle>Reset your password with the below form.</v-card-subtitle>

    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
                  cols="8"
                  md="12"
          >
            <v-text-field
                    :rules="passRules"
                    label="New Password"
                    required
                    type="password"
                    v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="justify-center">
      <v-btn
              :disabled="!valid"
              @click="submit"
      >
        Reset
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'PasswordReset',
        data: () => ({
            password: '',
            valid: false
        }),
        computed: {
            tokenInQuery() {
                if (!('tokenId' in this.$route.query))
                    return null
                return this.$route.query['tokenId']
            }
        },
        mounted() {
            this.redirect()
        },
        methods: {
            ...mapActions({
                newPassword: 'newPasswordAsync'
            }),
            redirect: function () {
                if (this.tokenInQuery === null)
                    this.$router.push({name: 'Data Bricks'})
            },
            submit: function () {
                this.redirect()
                this.newPassword({
                    password: this.password,
                    tokenId: this.tokenInQuery
                })
            }
        }
    }
</script>