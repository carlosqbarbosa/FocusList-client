<template>
  <aside
    class="bg-blue-900 text-white w-60 min-h-screen p-4 flex flex-col justify-between shadow-lg"
  >
    <div>
     <!-- <div class="flex items-center gap-2 mb-8">
        
        <img
          :src="userAvatar"
          alt="User"
          class="rounded-full w-10 h-10 object-cover"
        
        <span class="font-medium">{{ userName }}</span>
      </div>  -->

        <router-link to="/pomodoro" :class="linkClass('/pomodoro')">
          <div class="flex items-center gap-2">
            <Timer class="w-5 h-5" />
            <span>Pomodoro</span>
          </div>
        </router-link>

        <router-link to="/mytaskpage" :class="linkClass('/mytaskpage')">
          <div class="flex items-center gap-2">
            <CheckSquare class="w-5 h-5" />
            <span>Minhas Tasks</span>
          </div>
        </router-link>

        <nav class="space-y-2">
        <router-link to="/dashboard" :class="linkClass('/dashboard')">
          <div class="flex items-center gap-2">
            <LayoutDashboard class="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </router-link>

        <router-link to="/settings" :class="linkClass('/settings')">
          <div class="flex items-center gap-2">
            <Settings class="w-5 h-5" />
            <span>Configurações</span>
          </div>
        </router-link>
        <!--
        <router-link to="/help" :class="linkClass('/help')">
          <div class="flex items-center gap-2">
            <HelpCircle class="w-5 h-5" />
            <span>Suporte</span>
          </div>
        </router-link>-->
      </nav>
    </div>

    <button
      @click="showModal = true"
      class="flex items-center gap-2 text-white hover:text-blue-400 p-2 rounded transition"
    >
      <LogOut class="w-5 h-5" />
      <span>Sair</span>
    </button>

    <ModalLogout
      :show="showModal"
      @confirm="logout"
      @cancel="showModal = false"
    />
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.store";
import ModalLogout from "@/components/Modal/ModalLogout.vue";
import {
  LayoutDashboard,
  Timer,
  CheckSquare,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const showModal = ref(false);

const userName = computed(() => {
  if (authStore.usuario) {
    return authStore.usuario.nomeCompleto || `${authStore.usuario.nome} ${authStore.usuario.sobrenome}`
  }
  return 'Usuário'
})

/* 
const userAvatar = computed(() => {
  return authStore.usuario?.urlFotoPerfil || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
})*/

function linkClass(path) {
  return route.path === path
    ? "block bg-white text-blue-900 font-semibold p-2 rounded transition"
    : "block hover:bg-blue-700 p-2 rounded transition";
}

function logout() {
  showModal.value = false;
  authStore.logout();
  router.replace("/login");
}
</script>

<style scoped>
aside {
  transition: all 0.3s ease;
}
</style>
