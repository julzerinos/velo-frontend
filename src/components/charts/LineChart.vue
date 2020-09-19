<template>
  <apexchart :options="chartOptions" :series="series" height="350" type="line"/>
</template>

<script>
    export default {
        name: 'LineChart',
        props: {
            chartData: {
                default: () => ([1, 2, 3, 4])
            }
        },
        data() {
            return {


                series: [{
                    name: "Desktops",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: true
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Product Trends by Month',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    }
                }
            }
        }
    }

</script>

<style scoped>
</style>