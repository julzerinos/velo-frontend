<template>
  <v-card>
    <v-container fill-height fluid>
      <v-row>
        <v-col>
          <v-card-title>
            Add new data brick
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-container class="grid" fill-height fluid>
                <v-row>
                  <v-col>
                    <v-text-field
                            append-icon="show_chart"
                            counter="90"
                            label="Data brick name"
                            v-model="dataBrickName"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select
                            :items="configs"
                            append-icon="settings"
                            item-text="name"
                            label="Configuration"
                            outlined
                            return-object
                            v-model="configSelect"

                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                            :item-text="x => fullName(x)"
                            :items="athletes"
                            append-icon="directions_bike"
                            chips
                            deletable-chips
                            label="Athletes"
                            multiple
                            outlined
                            return-object
                            small-chips
                            v-model="athleteSelect"
                    />
                  </v-col>
                  <v-col>
                    <v-autocomplete
                            :items="timeRanges"
                            append-icon="date_range"
                            item-text="text"
                            label="Time range"
                            outlined
                            return-object
                            v-model="timeRange"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!configSelect" @click="submit">
              gotta go fast
            </v-btn>
          </v-card-actions>
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
                dataBrickName: '',
                configSelect: null,
                athleteSelect: [],
                timeRange: null
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
                this.addDataBrick({
                        config: this.configSelect,
                        athletes: this.athleteSelect,
                        timeRange: this.timeRange
                    }, {
                        cols: 12,
                        name: this.dataBrickName || 'Databrick'
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>