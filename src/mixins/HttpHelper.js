import API from 'vuex-requests/src/store/backends/API'

export default {
  name: 'HttpHelper',
  data () {
    return {
      syncservice: {
        resources: {
          tasks: 'tasks/'
        }
      },
      appointmentservice: {
        resources: {
          tasks: 'tasks/'
        }
      },
      authenticationservice: {
        resources: {
          login: 'auth/'
        }
      }
    }
  },
  methods: {
    getAPI (name) {
      console.log(process.env)
      let api = new API(name, this.$store)
      api.baseUrl = process.env[`${name.toUpperCase()}_URL`]
      api.headers = {
        'Content-Type': 'application/json',
        'Authorization': this.$cookies.get('token_type') + ' ' + this.$cookies.get('token')
      }
      api.resources = () => { return this[name].resources }
      return api
    },
    getObjectPath (object, path, defaultResponse) {
      let bits = path.split('.')
      for (let key of bits) {
        if (Object.keys(object).indexOf(key) !== -1) {
          object = object[key]
        } else {
          return defaultResponse
        }
      }
      return object
    }
  },
  computed: {
    $syncservice () {
      return this.getAPI('syncservice')
    },
    $appointmentservice () {
      return this.getAPI('appointmentservice')
    },
    $authenticationservice () {
      return this.getAPI('authenticationservice')
    }
  }
}
