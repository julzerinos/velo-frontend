<template>
  <v-card class="pa-2" min-height="100" outlined tile>
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
            // if (this.dataBrickCheck(this.data))
            //     this.populate()
        },
        watch: {
            // globalLoading: {
            //     immediate: true,
            //     handler(loading) {
            //         if (this.initialized)
            //             return
            //
            //         if (!loading)
            //             this.populate()
            //     }
            // }
        },
        methods: {
            populate(workouts = null) {
                if (this.initialized)
                    return

                this.initDataBrick(this.$refs['container'], this.data, workouts)

                this.loading = false
                this.initialized = true
            }
        }
    }
</script>

<style scoped>

</style>