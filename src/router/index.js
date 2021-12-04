import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
