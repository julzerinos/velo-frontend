<template>
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
              @input="updateParent" height="400px"
              lang="javascript" style="z-index: 0"
              v-model="code"
              width="100%"

      />
      <v-overlay :absolute="true" :value="loading">
        <v-progress-circular
                indeterminate
                size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-card-actions>

    <v-card-actions style="justify-content: center; width: 100%">
      <v-card height="100%" tile width="100%">
        <v-card-actions>
          <v-btn
                  @click="runCode"
                  block
                  text
          >
            Run code
          </v-btn>
        </v-card-actions>
        <v-scroll-x-transition hide-on-leave>
          <div ref="container"/>
        </v-scroll-x-transition>
      </v-card>
    </v-card-actions>
  </v-card>
</template>
<script>
    export default {
        name: 'ScriptEditor',
        components: {
            editor: require('vue2-ace-editor'),
        },
        model: {
            prop: '_',
            event: 'codeChanged'
        },
        props: {
            _: String
        },
        data: () => ({
            code: '// Multiline Chart Template\n\nreturn {\n    label: "Example multiline chart",\n    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n    series: [\n        {\n            name: "Series 1",\n            values: [10, 15, 17, 18, 19, 20, 57, 100, 80, 64]\n        },\n        {\n            name: "Series 2",\n            values: [15, 14, 17, 21, 19, 24, 58, 101, 50, 42]\n        }\n    ]\n}',
            editorDarkTheme: 'twilight',
            editorLightTheme: 'dawn',

            loading: true,
        }),
        mounted() {
            this.updateParent()
        },
        methods: {
            editorInit: async function () {
                require('brace/ext/language_tools')
                require('brace/mode/javascript')
                require(`brace/theme/${this.editorLightTheme}`)
                require(`brace/theme/${this.editorDarkTheme}`)
                this.loading = false
            },
            updateParent() {
                this.$emit('codeChanged', this.code)
            },
            async runCode() {
                const d3 = require('d3')

                const container = this.$refs['container']
                container.innerHTML = ''

                this.callConfiguration(this.code, {
                    d3: d3,
                    svg: d3.select(container).append('svg'),
                    athletes: this.$mockAthletes()
                })
            }
        },
    }
</script>
