<template>
  <v-card class="pa-2" outlined tile>
    <div ref="container"/>
  </v-card>
</template>

<script>
    import Vue from "vue";

    import MultiLineChart from "../charts/line-charts/MultiLineChart";
    import BarChart from "../charts/bar-charts/BarChart";

    export default {
        name: "DataBrick",
        props: {
            config: {
                type: Object,
                default: null
            }
        },
        mounted() {
            if (!this.config)
                return

            this.populate()
        },
        data() {
            return {
                training: this.$mockTraining().training,
                components: {
                    'line-chart': MultiLineChart,
                    'bar-chart': BarChart
                }
            };
        },
        methods: {
            getComponent() {
                // TODO: move to general/global class
            },

            populate() {
                let ComponentClass = Vue.extend(this.components[this.config.type])
                let instance = new ComponentClass({
                    propsData: {
                        training: this.training,
                        params: this.config.params
                    }
                })
                instance.$mount()
                this.$refs['container'].appendChild(instance.$el)
            }
        }
    }
</script>

<style scoped>

</style>