import {mapActions, mapGetters} from "vuex";
import simpleBarChart from '!raw-loader!../components/data-bricks/configurations/charts/bar-charts/simpleBarChart'
import multiLineChart from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/multiLineChart'
import workout from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/workout'
import averagePower from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/averagePower'
import powerCurveSingleWorkout
    from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/powerCurveSingleWorkout'
import powerCurveAgg from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/powerCurveAggregated'
import powerCurveMulti
    from '!raw-loader!../components/data-bricks/configurations/charts/line-charts/powerCurveMultiAthlete'

const d3 = require("d3")

export default {
    computed: {
        ...mapGetters({
            dataBricks: 'dataBricks',
            dataBrickConfigs: 'dataBrickConfigs',
            athletes: 'athletes',
            workouts: 'workouts',
            workoutsMetadata: 'workoutsMetadata'
        }),

        configTypes: () => [
            {
                name: 'Other',
                key: 'other'
            },
            {
                name: 'Single workout',
                key: 'single'
            },
            {
                name: 'Aggregated',
                key: 'aggregated'
            }
        ],

        configs() {
            return [
                {
                    name: 'Simple Bar Chart',
                    code: simpleBarChart,
                    key: 'bar-chart-simple',
                    type: 'other'
                },
                {
                    name: 'Multi Line Chart',
                    code: multiLineChart,
                    key: 'line-chart-multi',
                    type: 'single'
                },
                {
                    name: 'Workout Time Series Line Chart',
                    code: workout,
                    key: 'workout-time-series-line-chart',
                    type: 'single'
                },
                {
                    name: 'Average Power x time',
                    code: averagePower,
                    key: 'average-power',
                    type: 'aggregated'
                },
                {
                    name: 'Power Curve - Workout',
                    code: powerCurveSingleWorkout,
                    key: 'power-curve-single',
                    type: 'single'
                },
                {
                    name: 'Power Curve - Aggregated',
                    code: powerCurveAgg,
                    key: 'power-curve-agg',
                    type: 'aggregated'
                },
                {
                    name: 'Power Curve - Multiple athletes',
                    code: powerCurveMulti,
                    key: 'power-curve-multi',
                    type: 'aggregated'
                },
                ...(this.loggedIn ? this.dataBrickConfigs : [])
            ]
        },
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
                key: '_' + Math.random().toString(36).substr(2, 9),
                type: config.type
            })
        },

        dataBrickCheck(data) {
            for (const athlete of data.athletes)
                if (this.workoutsMetadata(athlete, data.timeRange.start, data.timeRange.end).length !== this.workouts(athlete, data.timeRange.start, data.timeRange.end).length)
                    return false

            return true
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

        callConfiguration: (code, args) => new Function('args', code)(args),

        async initDataBrick(container, data) {
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

            // TODO: Add warnings based on data or config results
            // const warnings = {
            //     athletesNoData: [...data.athletes.map(a => !(a in thinAthletes))]
            // }
            //
            // return warnings
        },

        timeRangeUnionsEqual(a, b) {
            const entries = Object.entries(a)

            if (entries.length !== Object.entries(b).length)
                return false

            for (const [key, [min, max]] of entries)
                if (!(key in b) || min !== b[key][0] || max !== b[key][1])
                    return false

            return true
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

        async refreshWorkouts(timeRangeUnion, onFinish) {
            if (this.dataBricks === null) {
                onFinish()
                return
            }

            let index = 0
            const timeRangeUnions = Object.entries(timeRangeUnion)
            for (const [ath, [min, max]] of timeRangeUnions) {
                if (++index === timeRangeUnions.length)
                    this.getWorkouts({athleteId: ath, start: min, end: max, onSuccess: onFinish, onFail: onFinish})
                else
                    this.getWorkouts({athleteId: ath, start: min, end: max})
            }
        },
    }
}
