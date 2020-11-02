<template>
  <v-card>
    <v-card-title>Script setup</v-card-title>

    <v-container>
      <v-row>
        <v-col cols="4">
          Data brick type
          <v-select :items="types" @change="updateParent"
                    item-text="name" item-value="key"
                    label="Type"
                    v-model="currentConfig.type"/>
        </v-col>

        <v-col cols="4">
          Test
          <v-select @change="updateParent"
                    label="Type"/>

        </v-col>

        <v-col cols="4">
          Test
          <v-select @change="updateParent"
                    label="Type"/>

        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>
<script>
    export default {
        name: 'ScriptSetup',
        model: {
            prop: 'config',
            event: 'configChanged'
        },
        props: {
            config: Object
        },
        data() {
            return {
                types: [{name: 'Line Chart', key: 'line-chart'}, {name: 'Bar Chart', key: 'bar-chart'}, {
                    name: 'Custom',
                    key: 'custom'
                },],

                currentConfig: {
                    type: ''
                }
            }
        },
        methods: {
            updateParent() {
                this.$emit('configChanged', this.currentConfig)
            }
        }
    }
</script>