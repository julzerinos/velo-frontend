<template>
  <v-card>
    <v-card-title>Script setup</v-card-title>

    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
                  @change="updateParent"
                  counter="90"
                  label="Configuration name"
                  v-model="currentConfig.name"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select :items="types"
                    @change="updateParent"
                    item-text="name" item-value="key"
                    label="Type"
                    v-model="currentConfig.type"
          />
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
                types: [{
                    name: 'Custom',
                    key: 'custom'
                },],

                currentConfig: {
                    name: 'Test configuration',
                    type: 'custom'
                }
            }
        },
        mounted() {
            this.updateParent()
        },
        methods: {
            updateParent() {
                this.$emit('configChanged', this.currentConfig)
            }
        }
    }
</script>