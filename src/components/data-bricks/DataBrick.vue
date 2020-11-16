<template>
  <v-card class="pa-2" outlined tile>
    <div ref="container">
    </div>
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
            loading: {
                type: Boolean,
                required: true
            }
        },
        data: function () {
            return {
                initialized: false,
                warnings: {athletesNoData: []}
            }
        },
        mounted() {
        },
        watch: {
            loading: function (loading) {
                if (!loading && !this.initialized)
                    this.populate()
            }
        },
        methods: {
            populate() {
                this.warnings = this.initDataBrick(this.$refs['container'], this.data)
                this.initialized = true
            }
        }
    }
</script>

<style scoped>

</style>