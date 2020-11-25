/* jshint asi:true */

const d3 = this.d3
const svg = this.svg
const athletes = this.athletes

const height = 400
const width = 1000
const margin = ({top: 20, right: 30, bottom: 30, left: 40})

const powers = athletes[0].workouts.map(w => ({power: w.dataSeries.power, time: w.dataSeries.time}))
const maxTime = athletes[0].workouts.reduce((a, b) => d3.max([a, d3.max(b.dataSeries.time)]), 0)

const indices = powers.map(() => 0)

const powerCurve = Array.from({length: maxTime}, function (x, i) {
    let avgPower = 0
    for (const [ix, power] of powers.entries()) {
        if (power.time[indices[ix]] === i)
            avgPower += (power.power[indices[ix]++] / powers.length)
        else
            avgPower += ((power.power[indices[ix] + 1] + power.power[indices[ix]]) / (2 * powers.length))
    }

    return {
        time: i,
        power: avgPower
    }
})

svg
    .attr("viewBox", [0, 0, width, height])

const x = d3.scalePow()
    .exponent(.4)
    .domain([0, maxTime])
    .range([margin.left, width - margin.right])

const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(8).tickSizeOuter(0))

svg
    .append('g')
    .call(xAxis)

const y = d3.scaleLinear()
    .domain([0, d3.max(powerCurve, d => d.power)]).nice()
    .range([height - margin.bottom, margin.top])

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Power curve"))

svg
    .append('g')
    .call(yAxis)

const line = d3.line()
    .defined(d => !isNaN(d.power))
    .x(d => x(d.time))
    .y(d => y(d.power))

const path = svg
    .append("path")
    .datum(powerCurve)
    .attr("d", line)
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("fill", "none")