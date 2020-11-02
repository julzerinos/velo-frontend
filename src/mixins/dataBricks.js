import {mapActions, mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters({
            dataBricks: 'dataBricks',
            dataBrickConfigs: 'dataBrickConfigs',
        })
    },
    methods: {
        ...mapActions({
            addDataBrickAsync: 'addDataBrickAsync',
        }),

        addDataBrick(data, brick) {
            this.addDataBrickAsync({
                data: data, brick: brick
            })
        }
    }
}