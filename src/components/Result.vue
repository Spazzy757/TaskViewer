<template>
  <v-expansion-panel-content :key="result.id">
    <div slot="header">{{ result.status }}</div>
    <div slot="header">{{ result.task_id }}</div>
    <div slot="header">
      <v-icon v-if="result.status === 'SUCCESS'" color="green">done_all</v-icon>
      <v-icon v-else-if="result.status === 'FAILURE'" color="red">report_problem</v-icon>
      <cube-spin v-else></cube-spin>
    </div>
    <v-container align-content-start>
      <v-list two-line>
          <v-list-tile avatar ripple>
            <v-list-tile-content>
              <v-list-tile-title>Task ID:</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ result.task_id }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider> </v-divider>
          <v-list-tile avatar ripple>
            <v-list-tile-content>
              <v-list-tile-title>Time Complete:</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{result.date_done | prettyTime }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider> </v-divider>
          <v-list-tile avatar ripple>
            <v-list-tile-content>
              <v-list-tile-title>Task Result:</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider> </v-divider>
      </v-list>
      <v-card>
      <v-card-text>
        <v-divider> </v-divider>
        <pre class="task-response">{{ result.task_response | pretty }}</pre>
      </v-card-text>
      </v-card>
    </v-container>
  </v-expansion-panel-content>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Result',
  props: ['result'],
  data () {
    return {
      detailView: false
    }
  },
  computed: {
    statusType: function () {
      if (this.result.status === 'SUCCESS') {
        return 'done_all'
      }
      return 'error'
    }
  },
  methods: {
    showDetailView () {
      this.detailView = !this.detailView
      console.log(this.detailView)
    }
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2)
    },
    prettyTime: function (value) {
      return moment(value).format('MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>
<style scoped>
  .task-status {
    alignment: right;
  }
  .task-response {
    text-align: left;
    color: maroon;
    overflow: scroll;
    background-color: lightgray;
    padding: 10px;
  }
</style>
