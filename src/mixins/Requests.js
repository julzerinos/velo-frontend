import axios from "axios";

export default {
    created() {
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
    },
    methods: {
        get(url, onSuccess, onFailure, retries = 3, retryDelay = 1000) {
            axios
                .get(url, {retry: retries, retryDelay: retryDelay})
                .then(response => onSuccess(response), response => onFailure(response));
        }
    }
}