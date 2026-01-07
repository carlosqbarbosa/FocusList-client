import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    token: null,
    autenticado: false,
    carregando: false,
  }),

  getters: {
    isAuthenticated: (state) => state.autenticado,
  },

  actions: {
    async login({ email, senha, lembrarMe }) {
      console.log('🔍 ====== DEBUG LOGIN FRONTEND ======')
      console.log(' Iniciando login...')
      console.log(' Email:', email)
      console.log(' Senha:', senha)
      console.log(' Lembrar-me:', lembrarMe)
      
      this.carregando = true

      try {
        console.log(' Fazendo request para /auth/login...')
        
        const { data } = await api.post('/auth/login', {
          email,
          senha,
        })

        console.log(' Resposta recebida:', data)
        console.log(' data.usuario:', data.usuario)
        console.log(' data.token:', data.token)

        this.usuario = data.usuario
        this.token = data.token
        this.autenticado = true

        console.log(' State atualizado:')
        console.log('   - usuario:', this.usuario)
        console.log('   - token:', this.token)
        console.log('   - autenticado:', this.autenticado)

        if (lembrarMe) {
          console.log(' Salvando no localStorage...')
          localStorage.setItem('token', this.token)
          localStorage.setItem('usuario', JSON.stringify(this.usuario))
          console.log(' Salvo no localStorage')
        }

        console.log(' Login concluído com sucesso!')
        console.log(' ====== FIM DEBUG FRONTEND ======')
        return true
        
      } catch (error) {
        console.error(' ====== ERRO NO LOGIN FRONTEND ======')
        console.error('Erro completo:', error)
        console.error('Resposta do erro:', error.response?.data)
        console.error('Status do erro:', error.response?.status)
        console.error('Headers do erro:', error.response?.headers)
        console.error(' ====== FIM ERRO ======')
        return false
        
      } finally {
        this.carregando = false
        console.log('Carregando finalizado')
      }
    },

    async register(dados) {
      this.carregando = true

      try {
        const { data } = await api.post('/auth/register', {
          nome: dados.nome,
          sobrenome: dados.sobrenome,
          email: dados.email,
          senha: dados.senha,
        })

        this.usuario = data.usuario
        this.token = data.token
        this.autenticado = true

        localStorage.setItem('token', this.token)
        localStorage.setItem('usuario', JSON.stringify(this.usuario))

        return true
      } catch (error) {
        console.error('Erro no cadastro:', error.response?.data)
        return false
      } finally {
        this.carregando = false
      }
    },

    carregarDoStorage() {
      const token = localStorage.getItem('token')
      const usuarioString = localStorage.getItem('usuario')

      if (!token || !usuarioString || usuarioString === 'undefined') {
        return
      }

      try {
        this.usuario = JSON.parse(usuarioString)
        this.token = token
        this.autenticado = true
      } catch (error) {
        console.error('Erro ao carregar storage:', error)
        this.usuario = null
        this.token = null
        this.autenticado = false
      }
    },

    logout() {
      this.usuario = null
      this.token = null
      this.autenticado = false

      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    }
  }
})