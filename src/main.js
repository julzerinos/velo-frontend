import Vue from 'vue'

import Ace from 'vue2-ace-editor'

import store from './plugins/vuex/vuex'
import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/routes'

import mockData from "./plugins/mockdata/mockdata";
import requests from "./plugins/requests/requests";
import statistics from "./plugins/maths/statistics";

import profile from "./mixins/profile";
import validationRuleset from "./mixins/validationRuleset";

import App from './App.vue'

Vue.use(Ace)

Vue.use(requests);
Vue.use(mockData);
Vue.use(statistics);

Vue.mixin(profile);
Vue.mixin(validationRuleset);

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
}).$mount('#app');
