import Vue from "vue";

export const logout = function (state) {
    state.profile = null;
    state.athletes = []
}

export const login = function (state, {profile}) {
    state.profile = profile;
}

export const profileChangeProperty = function (state, {property, value}) {
    if (property in state.profile)
        Vue.set(state.profile, property, value)
}