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
      this.carregando = true

      try {
        const response = await api.post('/auth/login', {
          email,
          senha,
          lembrarMe,
        })

        const data = response.data  

        console.log('LOGIN OK:', data)

        this.usuario = data.usuario
        this.token = data.token
        this.autenticado = true

        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        localStorage.setItem('refreshToken', data.refreshToken)

        return true

      } catch (error) {
        console.error('Erro no login:', error)
        return false
      } finally {
        this.carregando = false
      }
    },



    async register(dados) {
      this.carregando = true

      try {
        const response = await api.post('/auth/register', {
          nome: dados.nome,
          sobrenome: dados.sobrenome,
          email: dados.email,
          senha: dados.senha,
        })

        const data = response.data

        this.usuario = data.usuario
        this.token = data.token
        this.autenticado = true

        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        localStorage.setItem('refreshToken', data.refreshToken)

        return true

      } catch (error) {
        console.error('Erro no register:', error)
        return false
      } finally {
        this.carregando = false
      }
    },



    carregarDoStorage() {
      const token = localStorage.getItem('token')
      const usuario = localStorage.getItem('usuario')

      if (token && usuario) {
        this.token = token
        this.usuario = JSON.parse(usuario)
        this.autenticado = true
      }
    },



    logout() {
      this.usuario = null
      this.token = null
      this.autenticado = false

      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      localStorage.removeItem('refreshToken')
    },
  }
})
