import Vue from 'vue'

import vuetify from './plugins/vuetify/vuetify'
import router from './plugins/router/router'

import App from './App.vue'

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
