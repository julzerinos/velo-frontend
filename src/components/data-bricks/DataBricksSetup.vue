<template>
  <v-card>
    <v-container fill-height fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Add new data brick
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                        counter="90"
                        label="Data brick name"
                        v-model="dataBrickName"
                ></v-text-field>
                <v-select
                        :items="configs"
                        item-text="name"
                        label="Configuration"
                        outlined
                        return-object
                        v-model="configSelect"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn :disabled="!configSelect" @click="submit">
                gotta go fast
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

    export default {
        name: "DataBricksSetup",
        data() {
            return {
                configSelect: null,
                dataBrickName: '',
            }
        },
        computed: {
            configs() {
                return [
                    ...this.defaultConfigs(),
                    ...(this.loggedIn ? this.dataBrickConfigs : [])
                ]
            }
        },
        methods: {
            submit() {
                this.addDataBrick(
                    {config: this.configSelect, athletes: this.$mockAthletes()},
                    {cols: 12, name: this.dataBrickName}
                )
            }
        }
    }
</script>

<style scoped>

</style>