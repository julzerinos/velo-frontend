/* eslint-disable */

const d3 = args.d3
const svg = args.svg
const athletes = args.athletes

if (athletes[0]['workouts'].length < 1) { // noinspection JSAnnotator
    return
}

const workout = athletes[0].workouts[0].dataSeries
const exclude = ['time', 'latlng', 'distance']
const vars = Object.keys(workout).filter(m => !exclude.includes(m) && (workout[m] || {length: 0}).length !== 0)
const n = vars.length

const colour = d3.scaleOrdinal(d3.schemeCategory10)
const margin2 = {top: 520, right: 20, bottom: 30, left: 40}

const height = 600
const width = 1000
const h_each_plot = (height - 20 - 100) / n
const bh_top_chart = h_each_plot * (n - 1) + 100

const margin1 = {top: 20, right: 20, bottom: bh_top_chart, left: 40}
const chart_width = width - margin1.left - margin1.right
const chart_height = height - margin1.top - margin1.bottom

const context_height = height - margin2.top - margin2.bottom;
let margin_others;

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - height / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text(`workout: ${athletes[0].workouts[0].name}`);

const zoom2 = d3
    .zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [chart_width, chart_height]])
    .extent([[0, 0], [chart_width, chart_height]])
    .on("zoom", zoomed2);

const rule = svg
    .append("g")
    .append("line")
    .attr("y0", 0)
    .attr("y1", height - 120)
    .attr("stroke", "steelblue");

svg
    .attr("viewBox", [0, 0, width, height])
    .property("value", [])
    .on("mouseover", function () {
        rule.style("display", null);
    })
    .on("mouseout", function () {
        rule.style("display", "none");
    })
    .on("mousemove touchmove", mousemove)
    .attr("pointer-events", "none")
    .call(zoom2);


const today = new Date();
const startExt = new Date();
const endExt = new Date();

startExt.setDate(today.getDate() - 1);
endExt.setDate(today.getDate() + 1);

const brush = d3
    .brushX()
    .extent([[0, 0], [chart_width, context_height]])
    .on("brush", brushed);

let myVariables = {};
let myLines = {};
let myYs = {};

const x = d3.scaleLinear().range([0, chart_width]);

const x2 = d3.scaleLinear().range([0, chart_width]);
const y2 = d3.scaleLinear().range([context_height, 0]);

const xAxis = d3.axisBottom(x).tickFormat("");

const xAxisLast = d3.axisBottom(x);

const xAxis2 = d3.axisBottom(x2);

vars.forEach((vari, i) => {
    let yside = "y" + i;
    myYs[yside];

    myYs[yside] = d3.scaleLinear().range([chart_height, 0]);

    const yAxis = g => g
        .call(d3.axisLeft(myYs["y" + i]))
        .call(g => g.select(".domain").remove())
        .call(g =>
            g
                .select(".tick:last-of-type text")
                .clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(vars[i])
        );

    // for each plot the top margin moves down height of previous chart(s)
    margin_others = {top: h_each_plot * i + 20, right: 20, left: 40}; //adjust top

    var lineName = "line" + i;
    myLines[lineName] = d3
        .line()
        .x(function (d, ix) {
            return x(workout.time[ix]);
        })
        .y(function (d, ix) {
            return myYs["y" + i](d);
        });

    rule
        .append("text")
        .attr("class", "line" + i + "text")
        .attr("x", 12)
        .attr("y", height / 4)
        .attr("dy", ".35em");

    let variableName = "focus" + i

    myVariables[variableName] = svg
        .append("g")
        .attr("class", "focus" + i)
        .attr(
            "transform",
            `translate(${margin_others.left},${margin_others.top})`
        );

    x.domain(
        d3.extent(workout.time, function (d) {
            return d
        })
    );

    myYs["y" + i].domain([
        d3.min(workout[vars[i]], function (d) {
            return d;
        }),
        d3.max(workout[vars[i]], function (d) {
            return d
        })
    ]);

    myVariables[variableName]
        .append("path")
        .datum(workout[vars[i]])
        .attr("class", "line" + i)
        .attr("d", myLines["line" + i])
        .attr("fill", "none")
        .attr("clip-path", "url(#clip)")
        .style("stroke", colour(i))
        .style("stroke-width", "1.5px");

    // hide ticks for most plots
    i === vars.length - 1
        ? myVariables[variableName]
            .append("g")
            .attr("class", "axis axis--xLast")
            .attr("transform", "translate(0," + chart_height + ")")
            .call(xAxisLast)
        : myVariables[variableName]
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + chart_height + ")")
            .call(xAxis);

    myVariables[variableName]
        .append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    svg
        .append("rect")
        .attr("class", "zoom2" + i)
        .attr("id", "zoom2" + i)
        .attr("width", chart_width)
        .attr("height", chart_height)
        .attr("cursor", "move")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .attr(
            "transform",
            "translate(" + margin_others.left + "," + margin_others.top + ")"
        );
});

x2.domain(x.domain());

svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", chart_width)
    .attr("height", chart_height);

// context line
const line2 = d3
    .line()
    .x(function (d, ix) {
        return x2(workout.time[ix]);
    })
    .y(function (d) {
        return y2(d);
    });

y2.domain([
    d3.min(workout.distance, function (d) {
        return d;
    }),
    d3.max(workout.distance, function (d) {
        return d
    })
]);


const context = svg
    .append("g")
    .attr("class", "context")
    .attr("transform", `translate(${margin2.left},${margin2.top})`);

context
    .append("path")
    .datum(workout.distance)
    .attr("class", "line2")
    .attr("d", line2)
    .attr("fill", "none")
    .style("stroke", "steelblue")
    .style("stroke-width", "1.5px");

context
    .append("g")
    .attr("class", "axis axis--x2")
    .attr("transform", "translate(0," + context_height + ")")
    .call(xAxis2);

context
    .append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, x.range());

function brushed(event) {
    // console.log("brushed", event)

    // if (!event.sourceEvent || event.type === "zoom") return; // ignore brush-by-zoom
    // let s = event.selection || x2.range();
    //
    // x.domain(s.map(x2.invert), x2);
    //
    // // update each plot
    // svg.call(
    //     zoom2.transform,
    //     d3.zoomIdentity.scale(chart_width / (s[1] - s[0])).translate(-s[0], 0)
    // );
}

function zoomed2(event) {
    // console.log("zoomed", event)

    vars.forEach((d, i) => {
        d3.select(".focus" + i)
            .select(".line" + i)
            .attr("d", myLines["line" + i]);
        i === vars.length - 1
            ? d3.selectAll(".axis--xLast").call(xAxisLast)
            : d3.selectAll(".axis--x").call(xAxis);
    });

    if (!event.sourceEvent || event.type === "brush") return; // ignore zoom-by-brush
    let value = [];
    let t = event.transform;

    x.domain(t.rescaleX(x2).domain());
    value = x.domain();

    svg.property("value", value).dispatch("input");

    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

function mousemove(event) {
    const date = x.invert(d3.pointer(event)[0]);

    rule.attr("transform", `translate(${x(date)},${margin1.top})`);
}