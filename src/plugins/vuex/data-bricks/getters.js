import {loggedIn} from "../profile/getters";

export const dataBricks = state => loggedIn(state) ? state.profile.dataBricks.bricks : null
export const dataBrickConfigs = state => loggedIn(state) ? state.profile.dataBricks.configs : null

