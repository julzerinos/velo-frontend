import * as athletes from "./athletes/mutations";
import * as profile from "./profile/mutations";
import * as dataBricks from "./data-bricks/mutations";
import * as results from "./results/mutations";

export const mutations = {
    ...athletes,
    ...profile,
    ...dataBricks,
    ...results
}