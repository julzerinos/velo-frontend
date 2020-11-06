import {mapActions, mapGetters} from "vuex";
import simpleBarChart from '!raw-loader!../components/charts/bar-charts/simpleBarChart'
import multiLineChart from '!raw-loader!../components/charts/line-charts/multiLineChart'

const d3 = require("d3")

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
            addDataBrickConfigAsync: 'addDataBrickConfigAsync',
            removeDataBrick: 'removeDataBrickAsync'
        }),

        addDataBrick(data, brick) {
            this.addDataBrickAsync({
                data: data, brick: brick
            })
        },

        addConfiguration(name, code) {
            this.addDataBrickConfigAsync({
                name,
                code,
            })
        },

        initDataBrick(container, config) {
            new Function(config.code).call({
                d3: d3,
                svg: d3.select(container).append('svg'),
                athletes: this.athletes
            })
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
