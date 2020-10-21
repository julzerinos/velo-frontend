<template>
  <v-container class="grid" fill-height fluid>
    <v-row>
      <v-col :cols="openSetup ? 10 : 1">
        <v-card height="100%" tile>
          <v-card-actions class="justify-center">
            <v-btn
                    @click="setupClick"
                    block
                    text
            >
              Setup
            </v-btn>
          </v-card-actions>

          <v-scroll-x-transition hide-on-leave>
            <script-setup v-model="config" v-show="openSetup"/>
          </v-scroll-x-transition>
        </v-card>
      </v-col>
      <v-col :cols="openEditor ? 10 : 1">
        <v-card height="100%" tile>
          <v-card-actions class="justify-center">
            <v-btn
                    @click="editorClick"
                    block
                    text
            >
              Editor
            </v-btn>
          </v-card-actions>

          <v-scroll-x-transition hide-on-leave>
            <script-editor v-model="code" v-show="openEditor"/>
          </v-scroll-x-transition>
        </v-card>
      </v-col>

      <v-col :cols="openSave ? 10 : 1">
        <v-card height="100%" tile>
          <v-card-actions class="justify-center">
            <v-btn
                    @click="saveClick"
                    block
                    text
            >
              Save
            </v-btn>
          </v-card-actions>

          <v-scroll-x-transition hide-on-leave>
            <script-save :code="code" :config="config" v-show="openSave"/>
          </v-scroll-x-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import ScriptEditor from "../components/scripting/ScriptEditor";
    import ScriptSetup from "../components/scripting/ScriptSetup";
    import ScriptSave from "../components/scripting/ScriptSave";

    export default {
        name: "Scripting",
        components: {ScriptSetup, ScriptEditor, ScriptSave},
        data() {
            return {
                openSetup: false,
                openEditor: true,
                openSave: false,

                config: {},
                code: ''
            }
        },
        methods: {
            setupClick: function () {
                this.openSetup = true
                this.openSave = false
                this.openEditor = false
            },
            editorClick: function () {
                this.openEditor = true
                this.openSave = false
                this.openSetup = false
            },
            saveClick: function () {
                this.openSave = true
                this.openSetup = false
                this.openEditor = false
            },
        }
    };
</script>

