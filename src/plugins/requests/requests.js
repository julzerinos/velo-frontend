import axios from "axios";

// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//     const config = err.config;
//     if (!config || !config.retry) {
//         return Promise.reject(err);
//     }
//     config.__retryCount = config.__retryCount || 0;
//     if (config.__retryCount >= config.retry) {
//         return Promise.reject(err);
//     }
//     config.__retryCount += 1;
//     const backoff = new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve();
//         }, config.retryDelay || 1);
//     });
//     return backoff.then(function () {
//         return axios(config);
//     });
// });

// TODO
// axios.defaults.headers.common['header1'] = 'value' // for all requests

const base_url = 'http://localhost:8081'

export const get = function (
    endPoint,
    headers,
    params,
    onSuccess,
    onFailure,
    retries = 3,
    retryDelay = 1000
) {
    return axios
        .get(base_url + endPoint, {headers, params, retry: retries, retryDelay: retryDelay})
        .then(
            response => {
                onSuccess(response);
                return response
            },
            response => {
                onFailure(response);
                return response
            }
        );
}

export const post = function (
    endPoint,
    headers,
    params,
    body,
    onSuccess,
    onFailure,
    retries = 3,
    retryDelay = 1000
) {
    return axios
        .post(base_url + endPoint, body, {headers, params, retry: retries, retryDelay: retryDelay})
        .then(
            response => {
                onSuccess(response);
                return response
            },
            response => {
                onFailure(response);
                return response
            }
        );
}

export const methods = {
    get: get, post: post
}

export default {
    install(Vue, options) {
        Vue.get = get;
        Vue.post = post;

        Vue.prototype.$get = Vue.get;
        Vue.prototype.$post = Vue.post;
    }
}