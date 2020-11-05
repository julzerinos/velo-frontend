import {mapActions, mapGetters} from "vuex";

import simpleBarChart from '!raw-loader!../components/charts/bar-charts/simpleBarChart'
import multiLineChart from '!raw-loader!../components/charts/line-charts/multiLineChart'

export default {
    computed: {
        ...mapGetters({
            dataBricks: 'dataBricks',
            dataBrickConfigs: 'dataBrickConfigs',
        }),
    },
    methods: {
        ...mapActions({
            addDataBrickAsync: 'addDataBrickAsync',
            addDataBrickConfigAsync: 'addDataBrickConfigAsync'
        }),

        addDataBrick(data, brick) {
            this.addDataBrickAsync({
                data: data, brick: brick
            })
        },

        addDataBrickConfig(config) {
            this.addDataBrickConfigAsync(config)
        },

        addConfiguration(name, code) {
            return {
                name,
                code,
                get create() {
                    return (args) => new Function(this.code).call(args)
                }
            }
        },

        defaultConfigs: () => [
            {
                name: 'Simple Bar Chart',
                code: simpleBarChart,
                get create() {
                    return (args) => new Function(this.code).call(args)
                }
            },
            {
                name: 'Multi Line Chart',
                code: multiLineChart,
                get create() {
                    return (args) => new Function(this.code).call(args)
                }
            }
        ]
    }
}
