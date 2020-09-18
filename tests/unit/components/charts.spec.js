import {shallowMount} from '@vue/test-utils'
import Charts from "@/components/charts/Charts"

describe('Charts.vue', () => {
    it('should fail to fetch', () => {
        //TODO: test with mock backend
        const wrapper = shallowMount(Charts)
        expect(wrapper.text()).toMatch("Fetch failure")
    })
})