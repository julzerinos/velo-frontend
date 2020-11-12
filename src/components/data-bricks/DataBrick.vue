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
            return {}
        },
        mounted() {
            this.populate()
        },
        methods: {
            populate() {
                this.initDataBrick(this.$refs['container'], this.data)
            }
        }
    }
</script>

<style scoped>

</style>