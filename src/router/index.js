import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import PomodoroPage from '../views/PomodoroPage.vue'
import MyTaskPage from '../views/MyTaskPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/pomodoro',
    name: 'PomodoroPage',
    component: PomodoroPage,
  },
  {
    path: '/mytaskpage',
    name: 'MyTaskPage',
    component: MyTaskPage,

  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
