<template>
  <aside class="bg-blue-900 text-white w-60 min-h-screen p-4 flex flex-col justify-between shadow-lg">
    <div>
      <div class="flex items-center gap-2 mb-8">
        <img :src="avatar" alt="User" class="rounded-full w-10 h-10 object-cover" />
        <span class="font-medium">Camila Silva</span>
      </div>

      <nav class="space-y-2">
        <router-link to="/dashboard" :class="linkClass('/dashboard')">
          <div class="flex items-center gap-2">
            <LayoutDashboard class="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </router-link>

        <router-link to="/pomodoro" :class="linkClass('/pomodoro')">
          <div class="flex items-center gap-2">
            <Timer class="w-5 h-5" />
            <span>Pomodoro</span>
          </div>
        </router-link>

        <router-link to="/tasks" :class="linkClass('/tasks')">
          <div class="flex items-center gap-2">
            <CheckSquare class="w-5 h-5" />
            <span>Minhas Tasks</span>
          </div>
        </router-link>

        <router-link to="/settings" :class="linkClass('/settings')">
          <div class="flex items-center gap-2">
            <Settings class="w-5 h-5" />
            <span>Configurações</span>
          </div>
        </router-link>

        <router-link to="/help" :class="linkClass('/help')">
          <div class="flex items-center gap-2">
            <HelpCircle class="w-5 h-5" />
            <span>Suporte</span>
          </div>
        </router-link>
      </nav>
    </div>

    <router-link
      to="/logout"
      class="flex items-center gap-2 text-white hover:text-blue-400 p-2 rounded transition"
    >
      <LogOut class="w-5 h-5" />
      <span>Logout</span>
    </router-link>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import avatar from "@/assets/img/avatar.jpg";


const route = useRoute();

function linkClass(path) {
  return route.path === path
    ? "block bg-white text-blue-900 font-semibold p-2 rounded transition"
    : "block hover:bg-blue-700 p-2 rounded transition";
}
</script>

<style scoped>
aside {
  transition: all 0.3s ease;
}
</style>
