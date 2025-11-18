<template>
  <div class="min-h-screen flex">
    <div class="hidden md:block md:w-1/2 h-screen overflow-hidden bg-gray-100">
      <img
        :src="imgRegister"
        alt="Register illustration"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="w-full md:w-1/2 flex items-center justify-center bg-white min-h-screen">
      <div class="w-full max-w-sm p-6">
        <div class="flex flex-col items-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-10 w-10 text-blue-600 mb-2"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7" />
          </svg>
          <h1 class="text-3xl font-bold text-blue-700">FocusList</h1>
        </div>

        <h2 class="text-xl font-semibold text-blue-700 mb-6 text-center">Cadastro</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <div class="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                v-model="Nome"
                type="text"
                required
                placeholder="Digite seu primeiro nome"
                class="w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
            <div class="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                v-model="Sobrenome"
                type="text"
                required
                placeholder="Digite seu sobrenome"
                class="w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div class="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 6l4 4 4-4" />
              </svg>
              <input
                v-model="email"
                type="email"
                required
                placeholder="Exemplo@email.com"
                class="w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div class="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <input
                v-model="password"
                type="password"
                required
                placeholder="Digite sua senha"
                class="w-full focus:outline-none"
              />
            </div>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-600">
            <router-link to="/login" class="text-blue-600 hover:underline">
              Já possui conta? Faça o <span class="font-semibold">Login</span>
            </router-link>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import imgRegister from '@/assets/img/img-cadastro.png'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = () => {
  if (firstName.value && lastName.value && email.value && password.value) {
    localStorage.setItem('user', JSON.stringify({
      name: `${firstName.value} ${lastName.value}`,
      email: email.value
    }))
    router.push('/dashboard')
  } else {
    alert('Preencha todos os campos!')
  }
}
</script>

