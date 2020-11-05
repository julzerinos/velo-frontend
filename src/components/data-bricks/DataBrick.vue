<template>
  <v-card class="pa-2" outlined tile>
    <div ref="container">
    </div>
  </v-card>
</template>

<script>
    const d3 = require("d3")

    export default {
        name: "DataBrick",
        props: {
            data: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                config: this.data.config,
                athletes: this.data.athletes
            }
        },
        mounted() {
            this.populate()
        },
        methods: {
            populate() {
                // TODO: Check data is correct/contains data

                this.config.create({
                    d3: d3,
                    svg: d3.select(this.$refs['container']).append('svg'),
                    athletes: this.athletes
                })
            }
        }
    }
</script>

<style scoped>

</style>