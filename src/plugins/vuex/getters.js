import * as athletes from './athletes/getters'
import * as dataBricks from './data-bricks/getters'
import * as profile from './profile/getters'
import * as results from './results/getters'

export const getters = {
    ...athletes,
    ...dataBricks,
    ...profile,
    ...results
}