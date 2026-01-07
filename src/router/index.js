import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import PomodoroPage from '../views/PomodoroPage.vue'
import MyTaskPage from '../views/MyTaskPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/pomodoro',
    name: 'PomodoroPage',
    component: PomodoroPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/mytaskpage',
    name: 'MyTaskPage',
    component: MyTaskPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/HelpPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    authStore.carregarDoStorage()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router