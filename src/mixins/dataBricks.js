import {mapActions, mapGetters} from "vuex";
import simpleBarChart from '!raw-loader!../components/data-bricks/configurations/charts/bar-charts/simpleBarChart'
import multiLineChart from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/multiLineChart'
import workout from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/workout'

const d3 = require("d3")

const daysAgo = days => Date.now() - days * 24 * 60 * 60 * 1000


export default {
    computed: {
        ...mapGetters({
            dataBricks: 'dataBricks',
            dataBrickConfigs: 'dataBrickConfigs',
            athletes: 'athletes',
            workouts: 'workouts',
        }),

        timeRanges: () => [{
            text: "Last 10 days",
            start: daysAgo(10),
            end: Date.now()
        }, {
            text: "Last 30 days",
            start: daysAgo(30),
            end: Date.now()
        }],

        configs() {
            return [
                {
                    name: 'Simple Bar Chart',
                    code: simpleBarChart,
                    key: 'bar-chart-simple'
                },
                {
                    name: 'Multi Line Chart',
                    code: multiLineChart,
                    key: 'line-chart-multi'
                },
                {
                    name: 'Workout Time Series Line Chart',
                    code: workout,
                    key: 'workout-time-series-line-chart'
                },
                ...(this.loggedIn ? this.dataBrickConfigs : [])
            ]
        }
    },
    methods: {

        ...mapActions({
            addDataBrickAsync: 'addDataBrickAsync',
            addDataBrickConfigAsync: 'addDataBrickConfigAsync',
            removeDataBrick: 'removeDataBrickAsync',
            getWorkouts: 'workoutsAsync'
        }),

        addDataBrick(data, brick) {
            this.addDataBrickAsync({
                data: data,
                brick: brick
            })
        },

        addConfiguration(config, code) {
            this.addDataBrickConfigAsync({
                name: config.name,
                code,
                key: '_' + Math.random().toString(36).substr(2, 9)
            })
        },

        thinAthletes(athleteIds, timeRange) {
            const thinAthletes = []
            for (const athlete of this.athletes) {
                if (!athleteIds.includes(athlete.id)) continue

                let thinAthlete = Object.assign({}, athlete)
                delete thinAthlete.workouts
                delete thinAthlete.workoutsMetadata

                thinAthlete['workouts'] = this.workouts(
                    thinAthlete.id,
                    timeRange.start,
                    timeRange.end
                )
                thinAthletes.push(thinAthlete)
            }
            return thinAthletes
        },

        getConfigByKey(key) {
            return this.configs.find(x => x.key === key)
        },

        callConfiguration: (code, args) => new Function(code).call(args),

        initDataBrick(container, data) {
            // TODO: check if amount of workouts correspond to workoutsMetadata

            const thinAthletes = this.thinAthletes(data.athletes, data.timeRange)

            const config = this.getConfigByKey(data.config)

            this.callConfiguration(
                config.code,
                {
                    d3: d3,
                    svg: d3.select(container).append('svg'),
                    athletes: thinAthletes
                }
            )

            const warnings = {
                athletesNoData: [...data.athletes.map(a => !(a in thinAthletes))]
            }

            return warnings
        },

        getTimeRangeUnion() {
            const athletes = {}
            for (const dataBrick of this.dataBricks) {
                const timeRange = dataBrick.data.timeRange
                for (const ath of dataBrick.data.athletes) {
                    if (!(ath in athletes))
                        athletes[ath] = [Date.now(), 0]

                    if (athletes[ath][0] > timeRange.start) athletes[ath][0] = timeRange.start
                    if (athletes[ath][1] < timeRange.end) athletes[ath][1] = timeRange.end
                }
            }

            return athletes
        },

        refreshWorkouts(onFinish) {
            if (this.dataBricks === null) {
                onFinish()
                return
            }

            let index = 0
            const timeRangeUnions = Object.entries(this.getTimeRangeUnion())
            for (const [ath, [min, max]] of timeRangeUnions) {
                if (++index === timeRangeUnions.length)
                    this.getWorkouts({athleteId: ath, start: min, end: max, onSuccess: onFinish, onFail: onFinish})
                else
                    this.getWorkouts({athleteId: ath, start: min, end: max})
            }
        },
    }
}
