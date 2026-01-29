import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import PomodoroPage from '../views/PomodoroPage.vue'
import MyTaskPage from '../views/MyTaskPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/pomodoro',
    component: PomodoroPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/mytaskpage',
    component: MyTaskPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: SettingsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    component: () => import('../views/HelpPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')

  const isLogged = !!token

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresGuest = to.matched.some(r => r.meta.requiresGuest)

  if (requiresAuth && !isLogged) {
    return next('/login')
  }

  if (requiresGuest && isLogged) {
    return next('/pomodoro')
  }

  next()
})

export default router
