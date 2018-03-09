<template>
  <v-app>
    <tool-bar
      @search-event="searchUpdate"
      @environment-change="updateTaskList"
    > </tool-bar>
    <v-content v-if="errorMsg">
      <v-alert type="error" :value="true">
        {{ errorMsg }}
      </v-alert>
    </v-content>
    <v-content v-else>
      <div v-if="loading">
        <h3>Loading</h3>
        <pacman-loader :loading="loading"/>
      </div>
      <v-container v-if="!loading | tasks !== 0">
        <v-flex>
          <v-pagination :length="pageLen" v-model="pageNumber" @input="updateTaskList" total-visible="6"/>
        </v-flex>
        <v-list>
          <v-expansion-panel>
            <result v-for='result in tasksList' :result.sync='result' :key='result.id'/>
          </v-expansion-panel>
        </v-list>
        <v-flex v-if="!loading">
          <v-pagination :length="pageLen" v-model="pageNumber" @input="updateTaskList" total-visible="6"/>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Result from './Result'
import ToolBar from './ToolBar'
import PacmanLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'TaskResults',
  components: {
    ToolBar,
    Result,
    PacmanLoader
  },
  mounted: function () {
    this.getResults()
  },
  data () {
    return {
      errorMsg: null,
      environment: 'https://kong-staging.vumatel.co.za',
      loading: true,
      search: '',
      details: false,
      dateNow: 'time',
      isSuccess: true,
      isSelect: false,
      pageNumber: 1,
      limit: 20,
      offset: 20,
      path: 'sync',
      tasksList: [],
      count: 0
    }
  },
  computed: {
    getTaskList: function () {
      return this.$store.getters.getRequestById('get-sync-service', true)
    },
    tasks: function () {
      let tasks = this.getObjectPath(this.getTaskList, 'result.data', [])
      let self = this
      if (tasks.status === 403) {
        self.errorMsg = 'You do not have the required permissions to view this resource'
        return 0
      }
      if (tasks.length !== 0) {
        self.tasksList = tasks.results
        self.loading = false
        self.count = tasks.count
        return tasks.count
      }
      return 0
    },
    pageLen: function () {
      return Math.floor(this.count / this.limit)
    }
  },
  methods: {
    getResults: function () {
      /*
      runs a request that gets the result payload
       */
      let serviceMapper = {
        sync: this.$syncservice,
        appointments: this.$appointmentservice
      }
      let params = {
        limit: this.limit,
        offset: this.limit * this.pageNumber,
        search: this.search
      }
      serviceMapper[this.$store.state.service]
        .resource('tasks')
        .id('get-sync-service')
        .list(params)
    },
    searchUpdate: function (value) {
      this.search = value
      this.loading = true
      this.getResults()
    },
    updateTaskList: function () {
      this.loading = true
      this.getResults()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .page-limit {
    text-align: right;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
