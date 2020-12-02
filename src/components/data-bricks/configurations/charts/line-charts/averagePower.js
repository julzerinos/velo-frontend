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

const averagePower = Array.from({length: maxTime}, function (x, i) {
    let powerSum = 0
    let factor = powers.length

    for (const [ix, power] of powers.entries()) {
        if (indices[ix] >= power.power.length) {
            factor--
            continue
        }

        if (power.time[indices[ix]] === i)
            powerSum += power.power[indices[ix]++]
        else
            powerSum += (power.power[indices[ix] + 1] + power.power[indices[ix]]) / 2
    }

    return {
        time: i,
        power: powerSum / factor
    }
})

svg
    .attr("viewBox", [0, 0, width, height])

const x = d3.scalePow()
    .exponent(.45)
    .domain([0, maxTime])
    .range([margin.left, width - margin.right])

const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(8).tickSizeOuter(0).tickFormat(t => Math.floor(t / 60)))

svg
    .append('g')
    .call(xAxis)

const y = d3.scaleLinear()
    .domain([0, d3.max(averagePower, d => d.power)]).nice()
    .range([height - margin.bottom, margin.top])

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Average Power vs Time"))

svg
    .append('g')
    .call(yAxis)

const line = d3.line()
    .defined(d => !isNaN(d.power))
    .x(d => x(d.time))
    .y(d => y(d.power))

const path = svg
    .append("path")
    .datum(averagePower)
    .attr("d", line)
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("fill", "none")

const hover = function (svg, path) {
    if ("ontouchstart" in document) svg
        .style("-webkit-tap-highlight-color", "transparent")
        .on("touchmove", moved)
        .on("touchstart", entered)
        .on("touchend", left)
    else svg
        .on("mousemove", moved)
        .on("mouseenter", entered)
        .on("mouseleave", left);

    const dot = svg.append("g")
        .attr("display", "none");

    dot.append("circle")
        .attr("r", 2.5);

    dot.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8)

    function moved(event) {
        event.preventDefault();
        const pointer = d3.pointer(event);
        const xm = x.invert(pointer[0]);
        const ym = y.invert(pointer[1]);

        const i = d3.bisectLeft(averagePower.map(d => d.time), xm);

        // const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
        // path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();

        const xval = averagePower[i].time
        const yval = averagePower[i].power

        dot.attr("transform", `translate(${x(xval)},${y(yval)})`);
        dot.select("text").text(`${xval.toFixed(2)}, ${yval.toFixed(2)}`);
    }

    function entered() {
        // path.style("mix-blend-mode", null).attr("stroke", "#ddd");
        dot.attr("display", null);
    }

    function left() {
        // path.style("mix-blend-mode", "multiply").attr("stroke", null);
        dot.attr("display", "none");
    }
}

svg.call(hover, path);