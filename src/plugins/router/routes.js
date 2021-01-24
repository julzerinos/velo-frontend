import Vue from "vue";
import VueRouter from "vue-router";

import Splash from "../../pages/Splash";
import Layout from "../../pages/Layout";

import MainContent from "../../pages/DataBricksLayout";
import Settings from "../../pages/Settings";
import Profile from "../../pages/Profile";
import Scripting from "../../pages/Scripting";
import PasswordReset from "../../pages/PasswordReset";

Vue.use(VueRouter)

export const menuAppRoutes = [
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

const otherRoutes = [
    {
        path: '/confirm-password',
        name: 'Reset Password',
        component: PasswordReset
    }
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
                    ...menuAppRoutes,
                    ...otherRoutes,
                    {
                        path: '*',
                        redirect: '/databricks'
                    }
                ]
            },
        ]
    }
)