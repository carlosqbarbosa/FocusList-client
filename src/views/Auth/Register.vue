<template>
  <div class="min-h-screen flex">
    <!-- Lado Esquerdo - Imagem -->
    <div class="hidden md:block md:w-1/2 h-screen overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600">
      <img
        :src="imgRegister"
        alt="Register illustration"
        class="w-full h-full object-cover opacity-90"
      />
    </div>

    <!-- Lado Direito - Formulário -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white min-h-screen px-4">
      <div class="w-full max-w-md p-8">
        <!-- Logo centralizada -->
        <div class="flex justify-center mb-8">
          <LogoFocusList />
        </div>

        <!-- Título -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Crie sua conta</h2>
          <p class="text-gray-500 text-sm">Comece a organizar suas tarefas agora</p>
        </div>

        <!-- Formulário -->
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Campo Nome Completo -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                id="name"
                v-model="nomeCompleto"
                type="text"
                required
                placeholder="João Silva"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500': nameError }"
              />
            </div>
            <p v-if="nameError" class="mt-1 text-xs text-red-500">{{ nameError }}</p>
          </div>

          <!-- Campo Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="seu@email.com"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500': emailError }"
              />
            </div>
            <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
          </div>

          <!-- Campo Senha -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Mínimo 6 caracteres"
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500': passwordError }"
                @input="checkPasswordStrength"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <!-- Indicador de força da senha -->
            <div v-if="password" class="mt-2">
              <div class="flex gap-1 mb-1">
                <div class="h-1 flex-1 rounded" :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"></div>
                <div class="h-1 flex-1 rounded" :class="passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'"></div>
                <div class="h-1 flex-1 rounded" :class="passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'"></div>
              </div>
              <p class="text-xs" :class="{
                'text-red-500': passwordStrength === 1,
                'text-yellow-500': passwordStrength === 2,
                'text-green-500': passwordStrength === 3
              }">
                {{ passwordStrengthText }}
              </p>
            </div>
            <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
          </div>

          <!-- Termos de uso -->
          <div class="flex items-start">
            <input 
              id="terms" 
              v-model="acceptTerms" 
              type="checkbox" 
              class="w-4 h-4 mt-0.5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            >
            <label for="terms" class="ml-2 text-sm text-gray-600">
              Eu aceito os 
              <a href="#" class="text-purple-600 hover:text-purple-700 font-medium">Termos de Uso</a> 
              e a 
              <a href="#" class="text-purple-600 hover:text-purple-700 font-medium">Política de Privacidade</a>
            </label>
          </div>

          <!-- Botão de Cadastro -->
          <button
            type="submit"
            :disabled="isLoading || !acceptTerms"
            class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <span v-if="!isLoading">Criar conta</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Criando conta...
            </span>
          </button>

          <!-- Link para login -->
          <p class="text-center text-sm text-gray-600 mt-6">
            Já possui uma conta? 
            <router-link to="/login" class="text-purple-600 hover:text-purple-700 font-semibold">
              Faça login
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import LogoFocusList from '@/components/LogoFocusList.vue'
import imgRegister from '@/assets/img/img-cadastro.png'

const nomeCompleto = ref('')
const email = ref('')
const password = ref('')
const acceptTerms = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const passwordStrength = ref(0)
const router = useRouter()

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'Senha fraca'
    case 2: return 'Senha média'
    case 3: return 'Senha forte'
    default: return ''
  }
})

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const checkPasswordStrength = () => {
  const pwd = password.value
  let strength = 0
  
  if (pwd.length >= 6) strength++
  if (pwd.length >= 10) strength++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd)) strength++
  
  passwordStrength.value = strength
}

const handleRegister = async () => {
  // Reset errors
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''

  // Validações
  if (nomeCompleto.value.trim().split(' ').length < 2) {
    nameError.value = 'Por favor, insira seu nome completo'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'Por favor, insira um email válido'
    return
  }

  if (password.value.length < 6) {
    passwordError.value = 'A senha deve ter no mínimo 6 caracteres'
    return
  }

  if (!acceptTerms.value) {
    return
  }

  isLoading.value = true

  // Simular delay de API
  setTimeout(() => {
    localStorage.setItem('user', JSON.stringify({
      name: nomeCompleto.value,
      email: email.value
    }))
    router.push('/dashboard')
    isLoading.value = false
  }, 800)
}
</script>