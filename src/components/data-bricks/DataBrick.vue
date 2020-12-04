<template>
  <v-card class="pa-2" outlined tile>
    <div ref="container">
    </div>
    <v-overlay :value="loading" absolute opacity="0.2">
      <v-progress-circular
              indeterminate
              size="64"
      />
    </v-overlay>
  </v-card>
</template>

<script>

    export default {
        name: "DataBrick",
        props: {
            brick: {
                type: Object,
                required: true
            },
            data: {
                type: Object,
                required: true
            },
            globalLoading: {
                type: Boolean,
                required: true,
            }
        },
        data: function () {
            return {
                initialized: false,
                loading: this.globalLoading
            }
        },
        mounted() {
            if (this.dataBrickCheck(this.data))
                this.populate()
        },
        watch: {
            globalLoading: {
                immediate: true,
                handler(loading) {
                    if (this.initialized)
                        return

                    if (!loading)
                        this.populate()
                }
            }
        },
        methods: {
            populate() {
                this.loading = false
                this.initDataBrick(this.$refs['container'], this.data)
                this.initialized = true
            }
        }
    }
</script>

<style scoped>

</style>