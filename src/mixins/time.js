const normalizedToday = () => new Date(new Date().setHours(24, 0, 0, 0)).getTime()
const daysAgo = days => normalizedToday() - days * 24 * 60 * 60 * 1000

export default {
    computed: {
        timeRanges: () => [{
            text: "Last 10 days",
            start: daysAgo(10),
            end: normalizedToday()
        }, {
            text: "Last 30 days",
            start: daysAgo(30),
            end: normalizedToday()
        }],
    }
}