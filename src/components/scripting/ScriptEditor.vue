<template>
  <v-card flex>
    <v-card-title>Script creation</v-card-title>

    <v-container class="grid" fill-height fluid>
      <v-row>
        <v-col>
          <v-card-text>
            Use the power of D3 and Javascript to craft your own data visualization objects.
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-autocomplete :items="templates"
                            hint="Changing the template will overwrite any changes you have made below."
                            item-text="name"
                            item-value="code" label="Template" persistent-hint
                            v-model="template"
            />
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <editor
              ref="editor"
              :theme="$vuetify.theme.isDark ? editorDarkTheme : editorLightTheme" @init="editorInit"
              @input="updateParent" height="400px"
              lang="javascript" style="z-index: 0"
              v-model="code"
              width="100%"

      />
      <v-overlay :absolute="true" :value="loading" z-index="2">
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
        data: function () {
            return {
                code: '/* jshint asi:true */\n\nconst d3 = this.d3\nconst svg = this.svg\nconst athletes = this.athletes',
                template: null,

                editorDarkTheme: 'twilight',
                editorLightTheme: 'dawn',

                loading: true,
            }
        },
        computed: {
            templates: function () {
                return [
                    {
                        name: "None",
                        code: '/* jshint asi:true */\n\nconst d3 = this.d3\nconst svg = this.svg\nconst athletes = this.athletes\n\n'
                    },
                    ...this.configs
                ]
            }
        },
        mounted() {
            this.updateParent()
        },
        watch: {
            template: function (val) {
                this.code = val
            }
        },
        methods: {
            editorInit: async function () {
                require('brace/ext/language_tools')
                require('brace/mode/javascript')
                require(`brace/theme/${this.editorLightTheme}`)
                require(`brace/theme/${this.editorDarkTheme}`)

                const editor = this.$refs.editor.editor

                editor.setOptions({
                    cursorStyle: 'smooth',
                    readOnly: false,
                    printMargin: false,

                    fontSize: '80%',
                    showGutter: true,
                    fixedWidthGutter: true,

                    wrap: true,
                    tabSize: 4,
                })

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
