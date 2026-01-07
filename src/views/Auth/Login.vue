<template>
  <div class="min-h-screen flex">
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white min-h-screen px-4">
      <div class="w-full max-w-md p-8">
       
        <div class="flex justify-center mb-8">
          <LogoFocusList />
        </div>

        
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
          <p class="text-gray-500 text-sm">Entre com suas credenciais para continuar</p>
        </div>

        
        <div v-if="mensagemErro" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ mensagemErro }}</p>
        </div>

        
        <form @submit.prevent="handleLogin" class="space-y-5">
         
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="seu@email.com"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500': erroEmail }"
                :disabled="carregando"
              />
            </div>
            <p v-if="erroEmail" class="mt-1 text-xs text-red-500">{{ erroEmail }}</p>
          </div>

          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                id="password"
                v-model="senha"
                :type="mostrarSenha ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500': erroSenha }"
                :disabled="carregando"
              />
              <button
                type="button"
                @click="mostrarSenha = !mostrarSenha"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                :disabled="carregando"
              >
                
                <svg v-if="!mostrarSenha" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <p v-if="erroSenha" class="mt-1 text-xs text-red-500">{{ erroSenha }}</p>
          </div>

          
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="lembrarMe"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                :disabled="carregando"
              >
              <span class="ml-2 text-gray-600">Lembrar-me</span>
            </label>
            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">
              Esqueceu a senha?
            </a>
          </div>

          
          <button
            type="submit"
            :disabled="carregando"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <span v-if="!carregando">Entrar</span>
            <span v-else class="flex items-center justify-center">
              Entrando...
            </span>
          </button>

          
          <router-link
            to="/register"
            class="block w-full text-center py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Criar uma conta
          </router-link>
        </form>
      </div>
    </div>

    <div class="hidden md:block md:w-1/2 h-screen overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
      <img
        :src="imgLogin"
        alt="Login illustration"
        class="w-full h-full object-cover opacity-90"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.store'
import LogoFocusList from '@/components/LogoFocusList.vue'
import imgLogin from '@/assets/img/img-login.png'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const senha = ref('')
const lembrarMe = ref(false)

const carregando = ref(false)
const erroEmail = ref('')
const erroSenha = ref('')
const mensagemErro = ref('')
const mostrarSenha = ref(false)

const handleLogin = async () => {
  erroEmail.value = ''
  erroSenha.value = ''
  mensagemErro.value = ''

  if (!email.value) {
    erroEmail.value = 'Informe o e-mail'
    return
  }

  if (!senha.value) {
    erroSenha.value = 'Informe a senha'
    return
  }

  try {
    carregando.value = true

    await authStore.login({
      email: email.value,
      senha: senha.value,
      lembrarMe: lembrarMe.value,
    })

    router.replace('/dashboard')
  } catch (error) {
    mensagemErro.value = 'E-mail ou senha inválidos'
    console.error(error)
  } finally {
    carregando.value = false
  }
}
</script>