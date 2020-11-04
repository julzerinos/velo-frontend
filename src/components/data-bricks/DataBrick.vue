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
        props: { // TODO: Use below props
            config: {
                type: Object,
                default: null
            },
            // data: {
            //     type: Object,
            //     default: null
            // }
        },
        mounted() {
            if (!this.config)
                return

            this.populate()
        },
        data() {
            return {
                training: this.$mockTraining().training, // TODO: Delete
                athletes: this.$mockAthletes(), // TODO: Replace with data prop
                // config: {
                //     create() {
                //         const div = document.createElement("div")
                //         const h1 = document.createElement("h1")
                //         const text = document.createTextNode("test")
                //         h1.appendChild(text)
                //         div.appendChild(h1)
                //         return div
                // }
            }
        },
        methods: {
            populate() {
                const dataBrick = this.config.create({
                    d3: d3,
                    svg: d3.select(this.$refs['container']).append('svg')
                })

                // console.log(dataBrick)
                //
                // this.$refs['container'].appendChild(dataBrick)
            }
        }
    }
</script>

<style scoped>

</style>