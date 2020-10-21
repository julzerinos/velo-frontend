<template>
  <v-container class="grid" fill-height fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Script setup</v-card-title>

          <v-container>
            <v-row>
              <v-col cols="4">
                Data brick type
                <v-select label="Type"/>
              </v-col>
              <v-col cols="4">
                Test
                <v-select label="Type"/>
              </v-col>
              <v-col cols="4">
                Test
                <v-select label="Type"/>
              </v-col>
            </v-row>
          </v-container>

        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card flex>
          <v-card-title>Script creation</v-card-title>

          <v-card-text>
            Use the power of D3 and Javascript to craft your own data visualization.
          </v-card-text>

          <v-card-actions>
            <editor :options="{
                        cursorStyle: 'smooth',
                        readOnly: false,
                        printMargin: false,
                    }"
                    :theme="$vuetify.theme.isDark ? editorDarkTheme : editorLightTheme" @init="editorInit"
                    height="400px" lang="javascript"
                    style="z-index: 0" v-model="code"
                    width="100%"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Script save</v-card-title>

          <v-card-text>
            Save this script to use it within a data brick.
          </v-card-text>

          <v-card-actions>
            <v-btn>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Scripting",
        components: {
            editor: require('vue2-ace-editor'),
        },
        data: () => ({
            code: 'console.log("Hello World")',
            editorDarkTheme: 'twilight',
            editorLightTheme: 'dawn'
        }),
        methods: {
            editorInit: function () {
                require('brace/ext/language_tools')
                require('brace/mode/javascript')
                // require('brace/mode/less')
                require(`brace/theme/${this.editorLightTheme}`)
                require(`brace/theme/${this.editorDarkTheme}`)
                // require('brace/snippets/javascript')
            }
        }
    };
</script>

<style scoped>

</style>
