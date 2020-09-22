import {createLocalVue} from "@vue/test-utils";
import Vuex from 'vuex'

import profile from "../../../src/mixins/profile";
import mockData from "../../../src/plugins/mockdata/mockdata";

import axios from 'axios';

jest.mock('axios');

describe('profile.js', () => {
    it('logs in', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        let store = @require("@/plugins/vuex/vuex");

        profile.methods.login(mockData.methods.createMockProfile())
        expect(store.state.profile).toMatch(mockData.methods.createMockProfile())
    })
})