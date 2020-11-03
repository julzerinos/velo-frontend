<template>
  <v-card>
    <v-container fill-height fluid>
      <v-row>
        <v-col>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-card-subtitle>Currently viewing data for:</v-card-subtitle>
                <v-card-title>Kornel Skórka</v-card-title>
                <v-list-item-avatar
                        class="profile"
                        max-width="48"
                        size="48">
                  <v-img src="https://cdn.cnn.com/cnnnext/dam/assets/121012051552-armstrong-usps-horizontal-large-gallery.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical/>
        <v-col>
          <v-card>
            <v-card-title>
              Add new data brick
            </v-card-title>
            <v-card-text>
              <v-select
                      :items="['line-chart', 'bar-chart']"
                      label="Chart type"
                      outlined
                      v-model="chartSelect"
              />
              <v-select :items="Object.keys(training.dataSeries)"
                        label="Raw training attribute"
                        outlined
                        v-if="chartSelect === 'line-chart'"
                        v-model="auxSelect"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn @click="submit">
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
                chartSelect: 'line-chart',
                auxSelect: 'power',
                training: this.$mockTraining().training
            }
        },
        methods: {
            submit() {
                this.addDataBrick(
                    {type: this.chartSelect, params: {rawAttr: this.auxSelect}},
                    {cols: 12}
                )
            }
        }
    }
</script>

<style scoped>

</style>