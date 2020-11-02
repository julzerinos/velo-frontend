<template>
  <v-card>
    <v-card-title>Script save</v-card-title>

    <v-card-text>
      Save this script to use it within a data brick.
    </v-card-text>

    <v-card-actions>
      <v-btn @click="submit">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
    export default {
        name: 'ScriptSave',
        props: {
            // TODO: validation
            config: Object,
            code: String
        },
        methods: {
            submit() {
                this.addDataBrickConfig({
                    config: this.config,
                    code: this.code
                })
            }
        }
    }
</script>