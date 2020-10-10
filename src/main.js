import Vue from 'vue'

import store from './plugins/vuex/vuex'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/routes'

import mockData from "./plugins/mockdata/mockdata";
import requests from "./plugins/requests/requests";

import pageTitle from "./mixins/pageTitle";
import profile from "./mixins/profile";
import validationRuleset from "./mixins/validationRuleset";
import asyncResults from "./mixins/asyncResults";

import App from './App.vue'

Vue.use(requests);
Vue.use(mockData);

Vue.mixin(pageTitle);
Vue.mixin(profile);
Vue.mixin(validationRuleset);
Vue.mixin(asyncResults);

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app');
