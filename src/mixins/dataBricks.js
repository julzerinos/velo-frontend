import {mapActions, mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters({
            dataBricks: 'dataBricks',
            dataBrickConfigs: 'dataBrickConfigs',
        }),
    },
    methods: {
        ...mapActions({
            addDataBrickAsync: 'addDataBrickAsync',
            addDataBrickConfigAsync: 'addDataBrickConfigAsync'
        }),

        addDataBrick(data, brick) {
            this.addDataBrickAsync({
                data: data, brick: brick
            })
        },

        addDataBrickConfig(config) {
            this.addDataBrickConfigAsync(config)
        },

        defaultConfigs: () => [
            {
                name: 'Simple Bar Chart',
                code: simpleLineChart,
                create: (args) => new Function(simpleLineChart).call(args)
            }
        ]
    }
}

const simpleLineChart = `
const d3 = this.d3
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = this.svg

const data = [10, 15, 12];

        scaleFactor = 10,
        barHeight = 20;

        svg
                  .attr("width", width)
                  .attr("height", barHeight * data.length);

        var bar = svg.selectAll("g")
                  .data(data)
                  .enter()
                  .append("g")
                  .attr("transform", function(d, i) {
                        return "translate(0," + i * barHeight + ")";
                  });

    bar.append("rect")
       .attr("width", function(d) {
                return d * scaleFactor;
       })
       .attr("height", barHeight - 1);

    bar.append("text")
       .attr("x", function(d) { return (d*scaleFactor); })
       .attr("y", barHeight / 2)
       .attr("dy", ".35em")
       .text(function(d) { return d; });

`