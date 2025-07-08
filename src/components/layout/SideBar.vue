<template>
  <aside class="bg-blue-900 text-white w-60 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-8">
        <img :src="avatar" alt="User" class="rounded-full w-10 h-10 object-cover" />
        <span>Camila Silva</span>
      </div>
      <nav class="space-y-2">
        <button class="block w-full text-left hover:bg-blue-700 p-2 rounded">General</button>
        <button class="block w-full text-left hover:bg-blue-700 p-2 rounded">Pomodoro</button>
        <button class="block w-full text-left hover:bg-blue-700 p-2 rounded">My Task</button>
        <button class="block w-full text-left hover:bg-blue-700 p-2 rounded">Task Categories</button>
        <button class="block w-full text-left hover:bg-blue-700 p-2 rounded">Settings</button>
        <button class="block w-full text-left hover:bg-blue-700 p-2 rounded">Help</button>
      </nav>
    </div>
    <button class="text-left hover:bg-blue-700 p-2 rounded">Logout</button>
  </aside>
</template>

<script setup>
import avatar from '@/assets/img/avatar.jpg'
</script>