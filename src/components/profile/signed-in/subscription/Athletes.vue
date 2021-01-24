<template>
  <v-card>
    <v-toolbar
            color="green accent-5"
            dark
            flat
    >
      <v-toolbar-title>Available Athletes</v-toolbar-title>
      <v-spacer/>
      <v-btn
              :loading="loading"
              @click="refresh"
      >
        Refresh data
      </v-btn>
      <template v-slot:extension>
        <v-tabs
                fixed-tabs
                slider-color="primary"
                v-model="currentItem"
        >
          <v-tab
                  v-for="item in currentAthletes"
                  :href="'#tab-' + item.id"
                  :key="item.id"
          >
            {{ fullName(item) }}
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
                      :key="item.id"
                      @click="swap(item)"
                      v-for="item in more"
              >
                {{ fullName(item) }}
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
              v-for="athlete in currentAthletes.concat(more)"
      >
        <v-card flat>
          <!-- TODO: buffering list on scroll -->
          <v-virtual-scroll
                  :height="height"
                  :items="workoutsMetadataSort(athlete.id, (a, b) => new Date(a.startDateTime) <= new Date(b.startDateTime) ? 1 : -1)"
                  bench="5"
                  item-height="100"
          >

            <template v-slot:default="{ item }">
              <v-list-item :key="item.id">
                <v-list-item-title>{{item.name}}
                  <v-list-item-subtitle>{{new Date(item.startDateTime).toUTCString()}}</v-list-item-subtitle>
                </v-list-item-title>
                <v-list-item-action-text>
                  <span style="white-space: pre;">
                  Total kilometers: {{(item.totalDistance/1000).toFixed(2)}} <br/>
                  Total time: {{formatTotalDuration(item.totalTime)}}
                  </span>
                </v-list-item-action-text>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
    import {mapActions, mapGetters} from "vuex"
    import moment from 'moment'

    export default {
        name: 'Athletes',
        data() {
            return {
                height: 500,
                currentItem: null,
                loading: false,
            }
        },
        computed: {
            currentAthletes() {
                return this.athletes.slice(0, 2)
            },
            more() {
                return this.athletes.slice(2)
            },
            ...mapGetters({
                workoutsMetadataSort: 'workoutsMetadataSortable'
            }),
        },
        methods: {
            swap(athlete) {
                this.moveAthleteToFront({athlete})
            },
            ...mapActions({
                // workoutsMetadata: 'workoutsMetadataAsync',
                moveAthleteToFront: 'moveAthleteToFrontAsync',
                athletesRefresh: 'athletesAsync'
            }),
            formatTotalDuration: (duration) => moment.utc(moment.duration(duration, moment.ISO_8601).asMilliseconds()).format('hh:mm:ss'),
            refresh: function () {
                const onFinish = () => {
                    this.loading = false
                }

                this.loading = true
                this.athletesRefresh({
                    athleteIds: this.athletes.map(a => a.id),
                    onSuccess: onFinish.bind(this),
                    onFail: onFinish.bind(this)
                })
            }
        }
    }
</script>