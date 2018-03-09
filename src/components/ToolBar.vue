<template>
    <v-toolbar dark fixed>
      <v-text-field
        name="input-2-6"
        v-model="search"
        placeholder="search"
        v-on:keyup.enter='searchEvent'
      > </v-text-field>
      <v-btn flat icon v-on:click="searchEvent">
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer> </v-spacer>
      <!--<v-toolbar-title>{{ service.text }} Results</v-toolbar-title>-->
      <v-spacer> </v-spacer>
      <v-btn flat @click.stop="open" icon>
        <v-icon >settings</v-icon>
      </v-btn>
      <environment-settings
        @close-dialog="close"
        @environment-change="environmentChange"
        :dialog="dialog"
      > </environment-settings>
    </v-toolbar>
</template>

<script>
import EnvironmentSettings from './EnvironmentSettings'

export default {
  name: 'ToolBar',
  components: {
    EnvironmentSettings
  },
  data () {
    return {
      search: '',
      dialog: false
    }
  },
  methods: {
    close: function () {
      this.dialog = false
    },
    searchEvent: function () {
      this.$emit('search-event', this.search)
    },
    open: function () {
      this.dialog = true
    },
    environmentChange: function () {
      this.$emit('environment-change')
    }
  }
}
</script>
