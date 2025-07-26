<template>
  <aside class="bg-blue-900 text-white w-60 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-8">
        <img :src="avatar" alt="User" class="rounded-full w-10 h-10 object-cover" />
        <span>Camila Silva</span>
      </div>
      <nav class="space-y-2">
        <router-link
          to="/"
          :class="linkClass('/')"
        >General</router-link>

        <router-link
          to="/pomodoro"
          :class="linkClass('/pomodoro')"
        >Pomodoro</router-link>

        <router-link
          to="/tasks"
          :class="linkClass('/tasks')"
        >My Task</router-link>

        <router-link
          to="/categories"
          :class="linkClass('/categories')"
        >Task Categories</router-link>

        <router-link
          to="/settings"
          :class="linkClass('/settings')"
        >Settings</router-link>

        <router-link
          to="/help"
          :class="linkClass('/help')"
        >Help</router-link>
      </nav>
    </div>
    <router-link to="/logout" class="text-red-300 hover:text-red-400 p-2 rounded">Logout</router-link>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import avatar from '@/assets/img/avatar.jpg'

const route = useRoute()

function linkClass(path) {
  return route.path === path
    ? 'block bg-white text-blue-900 font-semibold p-2 rounded'
    : 'block hover:bg-blue-700 p-2 rounded'
}
</script>