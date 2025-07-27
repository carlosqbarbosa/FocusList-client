<template>
  <aside class="bg-blue-900 text-white w-60 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-8">
        <img :src="avatar" alt="User" class="rounded-full w-10 h-10 object-cover" />
        <span>Camila Silva</span>
      </div>
      <nav class="space-y-2">
        <router-link to="/" :class="linkClass('/')">
          <div class="flex items-center space-x-2">
            <!-- Ícone Home -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0H7" />
            </svg>
            <span>Dashboard</span>
          </div>
        </router-link>

        <router-link to="/pomodoro" :class="linkClass('/pomodoro')">
          <div class="flex items-center space-x-2">
            <!-- Ícone Relógio -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pomodoro</span>
          </div>
        </router-link>

        <router-link to="/tasks" :class="linkClass('/tasks')">
          <div class="flex items-center space-x-2">
            <!-- Ícone Lista -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span>My Task</span>
          </div>
        </router-link>

        <router-link to="/categories" :class="linkClass('/categories')">
          <div class="flex items-center space-x-2">
            <!-- Ícone Pastas -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h4l2 2h10a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" />
            </svg>
            <span>Task Categories</span>
          </div>
        </router-link>

        <router-link to="/settings" :class="linkClass('/settings')">
          <div class="flex items-center space-x-2">
            <!-- Ícone Engrenagem -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Settings</span>
          </div>
        </router-link>

        <router-link to="/help" :class="linkClass('/help')">
          <div class="flex items-center space-x-2">
            <!-- Ícone Interrogação -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 14v.01M12 10a4 4 0 10-4-4 4 4 0 004 4z" />
            </svg>
            <span>Help</span>
          </div>
        </router-link>
</nav>

    </div>
    
    <router-link
      to="/logout"
      class="flex items-center gap-2 text-white hover:text-blue-400 p-2 rounded"
    >
      <LogOut class="w-5 h-5" />
      <span>Logout</span>
    </router-link>

  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import avatar from '@/assets/img/avatar.jpg'
import { Home, Timer, ListTodo, Folder, Settings, HelpCircle, LogOut } from 'lucide-vue-next'

const route = useRoute()

function linkClass(path) {
  return route.path === path
    ? 'block bg-white text-blue-900 font-semibold p-2 rounded'
    : 'block hover:bg-blue-700 p-2 rounded'
}
</script>