<template>
  <div class="bg-blue-900 text-white min-h-screen p-6 w-60">
    <div class="flex flex-col gap-4">
      <div class="text-xl font-bold mb-6">Camila Silva</div>

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

      <div class="mt-auto">
        <router-link to="/logout" class="text-red-300 hover:text-red-400">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

function linkClass(path) {
  return route.path === path
    ? 'bg-white text-blue-900 font-semibold px-3 py-2 rounded'
    : 'text-white hover:text-blue-200 px-3 py-2 rounded'
}
</script>