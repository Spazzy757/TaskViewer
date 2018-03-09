<template>
  <v-app>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-content>
            <form v-on:submit.prevent>
              <v-card-text>
                <v-text-field
                  label="Please Enter Username"
                  class="mt-5"
                  v-model="credentials.username"
                  :rules="[() => credentials.username.length > 0 || 'This field is required']"
                  required
                > </v-text-field>
                <v-text-field
                  label="Please Enter Password"
                  type="password"
                  :rules="[() => credentials.password.length > 0 || 'This field is required']"
                  v-model="credentials.password"
                  required
                > </v-text-field>
                <small>*indicates required field</small>
                <v-alert type="error" :value="error">
                  {{ error }}
                </v-alert>
              </v-card-text>
              <v-btn @click="submit()" v-if="!loading">
                Login &nbsp; <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
              <div v-if="loading">
                <h3>Loading</h3>
                <pacman-loader :loading="loading"/>
              </div>
            </form>
          </v-content>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import PacmanLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'

export default {
  name: 'Login',
  components: { PacmanLoader },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      load: 1,
      loading: false,
      error: null
    }
  },
  methods: {
    submit () {
      let self = this
      this.loading = true
      axios.post('https://kong-staging.vumatel.co.za/authentication/auth/', {
        username: this.credentials.username,
        password: this.credentials.password,
        client_id: '9n5tWkjOfFOiiwchAJtXZ7vj7G5Qlw8G',
        client_secret: 'k2ypqY9emqMilO948I6ZYqNgrFPK5s6i'
      })
        .then(function (response) {
          self.$cookies.set('token', response.data.access_token, response.data.expires_in)
          self.$cookies.set('refresh_token', response.data.refresh_token)
          self.$cookies.set('token_type', response.data.token_type, response.data.expires_in)
          self.$router.push('/')
          self.loading = false
        })
        .catch(function (response) {
          console.log(response)
          self.error = 'Failed Logging In, Please check you username and password'
          self.loading = false
        })
    }
  }
}
</script>
