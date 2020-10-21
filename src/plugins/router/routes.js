import Vue from "vue";
import VueRouter from "vue-router";

import Splash from "../../pages/Splash";
import Layout from "../../pages/Layout";

import MainContent from "../../pages/DataBricks";
import Settings from "../../pages/Settings";
import Profile from "../../pages/Profile";
import Scripting from "../../pages/Scripting";

Vue.use(VueRouter)

export const mainAppRoutes = [
    {
        path: '/databricks',
        name: 'Data Bricks',
        icon: 'show_chart',
        component: MainContent
    },
    {
        path: '/scripting',
        name: 'Scripting',
        icon: 'code',
        component: Scripting,
    },
    {
        path: '/profile',
        name: 'Profile',
        icon: 'directions_bike',
        component: Profile,
        props: true
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: 'settings',
        component: Settings
    },
]

export default new VueRouter(
    {
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
                    ...mainAppRoutes,
                    {
                        path: '*',
                        redirect: '/databricks'
                    }
                ]
            },
        ]
    }
)