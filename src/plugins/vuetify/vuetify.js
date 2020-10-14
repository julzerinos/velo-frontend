import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// https://lobotuerto.com/vuetify-color-theme-builder/
import light from './themes/palette1/light'
import dark from './themes/palette1/dark'

Vue.use(Vuetify)

const opts = {
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light, dark
        }
    },
    icons: {
        iconfont: 'mdi',


    },
}

export default new Vuetify(opts)