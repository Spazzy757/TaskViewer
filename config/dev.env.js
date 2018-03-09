'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"https://kong-staging.vumatel.co.za/"',
  SYNCSERVICE_URL: '"https://kong-staging.vumatel.co.za/sync"',
  APPOINTMENTSERVICE_URL: '"https://kong-staging.vumatel.co.za/appointments"',
  AUTHENTICATIONSERVICE_URL: '"https://kong-staging.vumatel.co.za/authentication"',
})
