<template>
  <svg
          :height="height + marginTop"
          :width="width + marginLeft / 2"
          class="barchart"
  >
    <g :transform="`translate(${marginLeft / 2}, ${marginTop / 2})`">
      <g
              :transform="`translate(0, ${height})`"
              class="x-axis"
              fill="none"
              style="color: #888"
      >
        <path
                :d="`M0.5,6V0.5H${width}.5V6`"
                class="domain"
                stroke="currentColor"
        ></path>
        <g
                :key="index"
                :transform="`translate(${bar.x + bar.width / 2}, 0)`"
                class="tick"
                font-family="sans-serif"
                font-size="10"
                opacity="1"
                text-anchor="middle"
                v-for="(bar, index) in bars"
        >
          <line stroke="currentColor" y2="6"></line>
          <text dy="0.71em" fill="currentColor" y="9">{{ bar.xLabel }}</text>
        </g>
      </g>
      <g
              :transform="`translate(0, 0)`"
              class="y-axis"
              fill="none"
              style="color: #888"
      >
        <path
                :d="`M0.5,${height}.5H0.5V0.5H-6`"
                class="domain"
                stroke="currentColor"
        ></path>
        <g
                :key="index"
                :transform="`translate(0, ${y(tick) + 0.5})`"
                class="tick"
                font-family="sans-serif"
                font-size="10"
                opacity="1"
                text-anchor="end"
                v-for="(tick, index) in yTicks"
        >
          <line stroke="currentColor" x2="-6"></line>
          <text dy="0.32em" fill="currentColor" x="-9">{{ tick }}</text>
        </g>
      </g>
      <g class="bars" fill="none">
        <rect
                :height="bar.height"
                :key="index"
                :width="bar.width"
                :x="bar.x"
                :y="bar.y"
                fill="#2196f3"
                v-for="(bar, index) in bars"
        ></rect>
      </g>
    </g>
  </svg>
</template>

<script>
    import {scaleBand, scaleLinear} from "d3-scale";

    export default {
        name: "BarChart",
        props: {
            training: {default: null},

            height: {default: 200},
            width: {default: 501},
            // dataSet: {default: []},
            marginLeft: {default: 100},
            marginTop: {default: 40},
            marginBottom: {default: 40},
            marginRight: {default: 43},
            tickCount: {default: 10},
            barPadding: {default: 0.3},
        },
        data() {
            return {
                dataSet: this.formatData()
            }
        },
        methods: {
            formatData() {
                if (!this.training)
                    return undefined
                return [
                    [
                        "Zone 1",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 250), 0)
                    ],
                    [
                        "Zone 2",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 270 && x >= 250), 0)
                    ],
                    [
                        "Zone 3",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 290 && x >= 270), 0)
                    ],
                    [
                        "Zone 4",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 310 && x >= 290), 0)
                    ],
                    [
                        "Zone 5",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 330 && x >= 310), 0)
                    ],
                    [
                        "Zone 6",
                        this.training.dataSeries.power.reduce((n, x) => n + (x < 350 && x >= 330), 0)
                    ],
                    [
                        "Zone 7",
                        this.training.dataSeries.power.reduce((n, x) => n + (x >= 350), 0)
                    ],
                ]
            }
        },
        computed: {
            yTicks() {
                return this.y.ticks(this.tickCount);
            },
            x() {
                return scaleBand()
                    .range([0, this.width])
                    .padding(this.barPadding)
                    .domain(this.dataSet.map((e) => e[0]));
            },
            y() {
                let values = this.dataSet.map((e) => e[1]);
                return scaleLinear()
                    .range([this.height, 0])
                    .domain([0, Math.max(...values)]);
            },
            bars() {
                let bars = this.dataSet.map((d) => {
                    return {
                        xLabel: d[0],
                        x: this.x(d[0]),
                        y: this.y(d[1]),
                        width: this.x.bandwidth(),
                        height: this.height - this.y(d[1]),
                    };
                });

                return bars;
            },
        },
    };
</script>