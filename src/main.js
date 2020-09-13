import Vue from 'vue'

import store from './plugins/vuex/vuex'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/routes'

import mockData from "./plugins/mockdata/mockdata";
import requests from "./plugins/requests/requests";

import App from './App.vue'

Vue.use(requests);
Vue.use(mockData);

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app')
