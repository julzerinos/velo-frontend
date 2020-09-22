import axios from "axios";

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    const config = err.config;
    if (!config || !config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;
    const backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function () {
        return axios(config);
    });
});

// TODO
// axios.defaults.headers.common['header1'] = 'value' // for all requests

export default {
    methods: {
        get(
            url,
            headers,
            onSuccess,
            onFailure,
            retries = 3,
            retryDelay = 1000
        ) {
            axios
                .get(url, {headers, retry: retries, retryDelay: retryDelay})
                .then(
                    response => onSuccess(response),
                    response => onFailure(response)
                );
        },

        post(
            url,
            headers,
            body,
            onSuccess,
            onFailure,
            retries = 3,
            retryDelay = 1000
        ) {
            axios
                .post(url, body, {headers, retry: retries, retryDelay: retryDelay})
                .then(
                    response => onSuccess(response),
                    response => onFailure(response)
                );
        }
    },

    install(Vue, options) {
        Vue.get = this.methods.get;
        Vue.post = this.methods.post;

        Vue.prototype.$get = Vue.get;
        Vue.prototype.$post = Vue.post;
    }
}