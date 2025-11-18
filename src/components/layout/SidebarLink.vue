<template>
  <div class="bg-blue-900 text-white min-h-screen p-6 w-60 flex flex-col">
    <div class="flex flex-col gap-4 flex-1">
      <div class="text-xl font-bold mb-6">Camila Silva</div>

      <router-link to="/dashboard" :class="linkClass('/dashboard')">
        Dashboard
      </router-link>

      <router-link to="/pomodoro" :class="linkClass('/pomodoro')">
        Pomodoro
      </router-link>

      <router-link to="/mytaskpage" :class="linkClass('/mytaskpage')">
        Minhas Tasks
      </router-link>

      <router-link to="/settings" :class="linkClass('/settings')">
        Configuraçãos
      </router-link>

      <router-link to="/help" :class="linkClass('/help')">
        Suporte
      </router-link>
    </div>

    <button
      @click="showModal = true"
      class="text-red-300 hover:text-red-400 mt-auto font-medium"
    >
      Sair
    </button>

    <ModalLogout
      :show="showModal"
      @confirm="logout"
      @cancel="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalLogout from "@/components/Modal/ModalLogout.vue";

const route = useRoute();
const router = useRouter();
const showModal = ref(false);

function linkClass(path) {
  return route.path === path
    ? "bg-white text-blue-900 font-semibold px-3 py-2 rounded transition"
    : "text-white hover:text-blue-200 px-3 py-2 rounded transition";
}

function logout() {
  showModal.value = false;
  router.push("/login");
}
</script>
