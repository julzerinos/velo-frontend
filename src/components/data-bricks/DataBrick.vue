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
        },
        data() {
            return {
                config: this.data.config,
                athletes: this.data.athletes,
            }
        },
        mounted() {
            this.populate()
        },
        methods: {
            populate() {
                // TODO: Check data is correct/contains data

                this.initDataBrick(this.$refs['container'], this.config)
            }
        }
    }
</script>

<style scoped>

</style>