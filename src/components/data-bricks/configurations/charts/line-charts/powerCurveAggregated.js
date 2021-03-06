/* eslint-disable no-undef */

const d3 = args.d3
const svg = args.svg
const athletes = args.athletes

const height = 400
const width = 1000
const margin = ({top: 20, right: 30, bottom: 30, left: 40})

const powers = athletes[0].workouts.map(w => w.metrics.powerCurve)
const longestTimes = powers.reduce((a, b) => a.length > b.times.length ? a : b.times, [])

const aggregatedPowers = Array.from({length: longestTimes.length}, function (x, i) {
    let maxPower = 0

    for (const power of powers) {
        if (i >= power.powers.length)
            continue

        if (power.powers[i] > maxPower)
            maxPower = power.powers[i]
    }

    return maxPower
})

svg
    .attr("viewBox", [0, 0, width, height])

const x = d3.scalePow()
    .exponent(.45)
    .domain([0, d3.max(longestTimes)])
    .range([margin.left, width - margin.right])

const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(8).tickSizeOuter(0).tickFormat(t => Math.floor(t / 60) + "min"))

svg
    .append('g')
    .call(xAxis)

const y = d3.scaleLinear()
    .domain([0, d3.max(aggregatedPowers)]).nice()
    .range([height - margin.bottom, margin.top])

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(t => t + "W"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(`Power Curve - Aggregated`))

svg
    .append('g')
    .call(yAxis)

const line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(longestTimes[i]))
    .y(d => y(d))

const path = svg
    .append("path")
    .datum(aggregatedPowers)
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

        const i = d3.bisectLeft(longestTimes, xm);

        // const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
        // path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();

        const xval = longestTimes[i]
        const yval = aggregatedPowers[i]

        if (!xval)
            return

        dot.attr("transform", `translate(${x(xval)},${y(yval)})`);
        dot.select("text").text(
            `${yval.toFixed(2)}W @ ${xval.toFixed(2)}s`
        );
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