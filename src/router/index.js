import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import axios from 'axios';

/* secondary routes */
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
Register = () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
Users = () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
Unauthorized = () => import(/* webpackChunkName: "unauthorized" */ '../views/Unauthorized.vue');

function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){
    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    console.log(req);

    axios.post("http://localhost:8001/validate", {}, req).then(res => {
      console.log(res.data.res);
      next();
    }).catch(err => {
      console.log(err.response.data.err);
      next("/unauthorized");
    });
    
  }else{
    next("/login");
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
