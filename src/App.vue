<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  authStore.carregarDoStorage()
})
</script>

<style>
</style>
