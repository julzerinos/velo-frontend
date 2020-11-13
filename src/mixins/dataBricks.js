import {mapActions, mapGetters} from "vuex";
import simpleBarChart from '!raw-loader!../components/charts/bar-charts/simpleBarChart'
import multiLineChart from '!raw-loader!../components/charts/line-charts/multiLineChart'

const d3 = require("d3")

export default {
    computed: {
        ...mapGetters({
            dataBricks: 'dataBricks',
            dataBrickConfigs: 'dataBrickConfigs',
            athletes: 'athletes',
            workouts: 'workouts'
        }),

        timeRanges: () => [{
            text: "Last 10 days",
            start: Date.now() - 10 * 24 * 60 * 60 * 1000,
            end: Date.now()
        }, {
            text: "Last 30 days",
            start: Date.now() - 30 * 24 * 60 * 60 * 1000,
            end: Date.now()
        }]
    },
    methods: {
        ...mapActions({
            addDataBrickAsync: 'addDataBrickAsync',
            addDataBrickConfigAsync: 'addDataBrickConfigAsync',
            removeDataBrick: 'removeDataBrickAsync',
            getWorkouts: 'getWorkoutsForDataBrickAsync'
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

        thinAthletes(athletes, timeRange) {
            const thinAthletes = []
            for (const athlete of this.athletes) {
                if (!athletes.includes(athlete.id)) continue

                const {workoutMetadata, ...thinAthlete} = athlete

            }
        },

        initDataBrick(container, data) {
            console.log(data)
            this.getWorkouts({athleteIds: data.athletes})

            // here check if workouts in athlete
            // here update workouts in athlete

            new Function(data.config.code).call({
                d3: d3,
                svg: d3.select(container).append('svg'),
                athletes: data.thletes
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
