export const methods = {
    asc: arr => arr.sort((a, b) => a - b),
    sum: arr => arr.reduce((a, b) => a + b, 0),
    mean: arr => methods.sum(arr) / arr.length,
    std: (arr) => {
        const mu = methods.mean(arr);
        const diffArr = arr.map(a => (a - mu) ** 2);
        return Math.sqrt(methods.sum(diffArr) / (arr.length - 1));
    },
    quantile: (arr, q) => {
        const sorted = methods.asc(arr);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    }
}

export default {
    methods: methods,

    install(Vue, options) {
        Vue.statisticsToolset = this.methods;

        Vue.prototype.$statisticsToolset = Vue.statisticsToolset;
    }
}