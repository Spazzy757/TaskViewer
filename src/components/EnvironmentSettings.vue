<template>
  <v-dialog v-model="dialog" max-width="500px" absolute>
    <v-card>
      <v-card-title>
        Settings
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="currentService"
          :items="serviceList"
          label="Service"
          @input="environmentChange"
        > </v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'EnvironmentSettings',
  components: {},
  props: {
    dialog: {
      type: Boolean
    }
  },
  data () {
    return {
      serviceList: [
        {
          text: 'Sync Service',
          value: 'sync'
        },
        {
          text: 'Appointment Service',
          value: 'appointments'
        }
      ],
      currentService: 'sync'
    }
  },
  methods: {
    environmentChange: function () {
      this.$store.commit('changeService', {service: this.currentService})
      this.$emit('environment-change')
      this.$emit('close-dialog')
    },
    close: function () {
      this.$emit('close-dialog')
    }
  }
}
</script>
<style scopped>
</style>
