/* eslint-disable no-undef */

const d3 = args.d3
const svg = args.svg
const athletes = args.athletes

const height = 400
const width = 1000
const margin = ({top: 20, right: 30, bottom: 30, left: 40})

let commonLongestTimes = []
const series = []

for (const athlete of athletes) {
    const powers = athlete.workouts.map(w => w.metrics.powerCurve)
    const longestTimes = powers.reduce((a, b) => a.length > b.times.length ? a : b.times, [])
    if (longestTimes.length > commonLongestTimes.length)
        commonLongestTimes = longestTimes
    const aggregatedPowers = Array.from({length: longestTimes.length}, (x, i) => {
        let maxPower = 0

        for (const power of powers) {
            if (i >= power.powers.length)
                continue

            if (power.powers[i] > maxPower)
                maxPower = power.powers[i]
        }

        return maxPower
    })

    series.push({
        name: athlete.firstName + ' ' + athlete.lastName,
        values: aggregatedPowers
    })
}

const data = {
    y: "Power Curve",
    dates: commonLongestTimes,
    series: series
}

svg
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "hidden");

const x = d3.scalePow()
    .exponent(.45)
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(8).tickSizeOuter(0).tickFormat(t => Math.round(t / 60) + "min"))

svg.append("g")
    .call(xAxis);

const y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])

const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

svg.append("g")
    .call(yAxis);

const line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))

const path = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(data.series)
    .join("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", function (d) {
        return line(d.values)
    });

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
        .attr("y", -8);

    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    function moved(event) {
        event.preventDefault();
        const pointer = d3.pointer(event, this);
        const xm = x.invert(pointer[0]);
        const ym = y.invert(pointer[1]);
        const i = d3.bisectCenter(data.dates, xm);
        const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
        path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
        dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
        dot.select("text").text(`${s.name} | ${ym.toFixed(0)}W / ${toHHMMSS(xm)}s`);
    }

    function entered() {
        path.style("mix-blend-mode", null).attr("stroke", "#ddd");
        dot.attr("display", null);
    }

    function left() {
        path.style("mix-blend-mode", "multiply").attr("stroke", null);
        dot.attr("display", "none");
    }
}

svg.call(hover, path);