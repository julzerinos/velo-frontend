<template>
  <v-card>
    <v-toolbar
            color="green accent-5"
            dark
            flat
    >
      <v-spacer/>
      <v-toolbar-title>Available Athletes</v-toolbar-title>
      <v-spacer/>

      <template v-slot:extension>
        <v-tabs
                fixed-tabs
                slider-color="white"
                v-model="currentItem"
        >
          <v-tab
                  :href="'#tab-' + item.id"
                  :key="item.name"
                  v-for="item in athletes"
          >
            {{ item.name }}
          </v-tab>

          <v-menu
                  bottom
                  left
                  v-if="more.length"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                      class="align-self-center mr-4"
                      text
                      v-bind="attrs"
                      v-on="on"
              >
                More
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>

            <v-list class="lighten-3">
              <v-list-item
                      :key="item.name"
                      @click="addItem(item)"
                      v-for="item in more"
              >
                {{ item.name }}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="currentItem">
      <v-tab-item
              :key="athlete.id"
              :value="`tab-${athlete.id}`"
              v-for="athlete in athletes.concat(more)"
      >
        <v-card flat>
          <!-- TODO: buffering list on scroll -->
          <v-virtual-scroll
                  :height="height"
                  :items="athlete.trainings"
                  bench="5"
                  item-height="100"
          >

            <template v-slot:default="{ item }">
              <v-list-item :key="item.id">
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{new Date(item.startDateTime).toUTCString()}}</v-list-item-subtitle>
                  <v-list-item-content>
                  <span style="white-space: pre;">
                  Total Km: {{item.totalDistance}} <br/>
                  Total Time: {{new Date(item.totalTime.seconds * 1000).toISOString().substr(11, 8)}}
                  </span>
                  </v-list-item-content>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
    import {mapActions} from "vuex";

    export default {
        name: 'Athletes',
        data() {
            return {
                athletes: [
                    {
                        name: "Athlete 1", id: "1", trainings: [
                            {
                                "name": "big bang theory",
                                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 3600,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 50000
                            },
                        ],
                    },
                    {
                        name: "Athlete 2", id: "2", trainings: [
                            {
                                "name": "fastest led in the wild wesd",
                                "id": "3fa85f64ss-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-45ss62-b3fc-2c963f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 1000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 3
                            },
                            {
                                "name": "vroom vroom",
                                "id": "3fa85f6ss4-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 100000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 69
                            },
                            {
                                "name": "vroom vroom",
                                "id": "3fa85f6ss4-dw5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 100000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 69
                            },
                            {
                                "name": "vroom vroom",
                                "id": "3fa8awdd5f6ss4-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 100000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 69
                            },
                            {
                                "name": "vroom vroom",
                                "id": "3fa8awdd5f6ssefs4-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 100000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 69
                            },
                            {
                                "name": "vroom vroom",
                                "id": "3fa8awdd5f6ssfse4-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 100000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 69
                            },
                            {
                                "name": "vroom vroom",
                                "id": "3fa8awdd5f6sews4-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 100000000,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 69
                            },
                        ],
                    }
                ],

                height: 500,
                currentItem: '',
                more: [
                    {
                        name: "Athlete 3", id: "3", trainings: [
                            {
                                "name": "test 3",
                                "id": "3fa85f6ss4-5717-4562-b3fc-2c963f66afa6",
                                "athleteId": "3fa85f64-5717-4562-b3fc-2c96ssl3f66afa6",
                                "startDateTime": "2020-12-21T15:16:19.102Z",
                                "totalTime": {
                                    "seconds": 3,
                                    "nano": 0,
                                    "negative": true,
                                    "zero": true,
                                    "units": [
                                        {
                                            "dateBased": true,
                                            "timeBased": true,
                                            "durationEstimated": true
                                        }
                                    ]
                                },
                                "totalDistance": 420
                            },
                        ],
                    }
                ],
            }
        },
        methods: {
            addItem(item) {
                const removed = this.athletes.splice(0, 1)
                this.athletes.push(
                    ...this.more.splice(this.more.indexOf(item), 1),
                )
                this.more.push(...removed)
                this.$nextTick(() => {
                    this.currentItem = 'tab-' + item.id
                })
            },
            ...mapActions({
                workoutsMetadata: 'workoutsMetadataAsync'
            })
        }
    }
</script>