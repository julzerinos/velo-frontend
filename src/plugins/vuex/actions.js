import * as athletes from './athletes/actions'
import * as dataBricks from './data-bricks/actions'
import * as profile from './profile/actions'
import * as results from './results/actions'

export const actions = {
    ...athletes,
    ...dataBricks,
    ...profile,
    ...results
}