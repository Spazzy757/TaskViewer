import Vue from 'vue'
import Router from 'vue-router'
import TaskResults from '@/components/TaskResults'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaskResults',
      component: TaskResults
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
