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
                    <v-autocomplete
                            :items="configTypes"
                            append-icon="category"
                            item-text="name"
                            item-value="key"
                            label="Type"
                            outlined
                            v-model="configTypeSelect"
                    />
                  </v-col>

                  <v-col>
                    <v-autocomplete
                            :items="configsByType"
                            append-icon="settings"
                            item-text="name"
                            item-value="key"
                            label="Configuration"
                            outlined
                            v-model="configSelect"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                            :item-text="x => fullName(x)"
                            item-value="id"
                            :items="athletes"
                            append-icon="directions_bike"
                            chips
                            deletable-chips
                            label="Athletes"
                            multiple
                            outlined
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
            <v-btn :disabled="!timeRange || !athleteSelect || !athleteSelect.length || !configSelect" @click="submit">
              gotta go fast
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

    const daysAgo = days => Date.now() - days * 24 * 60 * 60 * 1000

    export default {
        name: "DataBricksSetup",
        data() {
            return {
                dataBrickName: '',
                configTypeSelect: null,
                configSelect: null,
                athleteSelect: [],
                timeRange: null,
            }
        },
        computed: {
            configsByType() {
                if (this.configTypeSelect === null)
                    return []
                return this.configs.filter(c => c.type === this.configTypeSelect)
            },
            timeRanges: () => [{
                text: "Last 10 days",
                start: daysAgo(10),
                end: Date.now()
            }, {
                text: "Last 30 days",
                start: daysAgo(30),
                end: Date.now()
            }],
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