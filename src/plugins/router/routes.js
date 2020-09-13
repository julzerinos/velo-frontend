import Vue from "vue";
import VueRouter from "vue-router";

import Splash from "../../pages/Splash";
import Layout from "../../pages/Layout";

import MainContent from "../../pages/MainContent";
import Settings from "../../pages/Settings";
import Profile from "../../pages/Profile";

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
                    path: '/maincontent',
                    name: 'maincontent',
                    component: MainContent
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: Settings
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: Profile,
                    props: true
                },
                {
                    path: '*',
                    redirect: '/maincontent'
                }
            ]
        },
    ]
}

export default new VueRouter(opts)