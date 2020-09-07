import Vue from "vue";
import VueRouter from "vue-router";

import Splash from "../../pages/Splash";
import Layout from "../../pages/Layout";

import MainContent from "../../components/MainContent";
import Settings from "../../components/Settings";

Vue.use(VueRouter)

const opts = {
    mode: 'history',
    routes: [
        {
            path: '/bettertimes',
            name: 'bettertimes',
            component: Splash
        },
        {
            path: '/',
            name: 'main',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'maincontent',
                    component: MainContent
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: Settings
                }
            ]
        },
    ]
}

export default new VueRouter(opts)