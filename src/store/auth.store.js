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
    nomeCompleto: (state) => {
      if (!state.usuario) return ''
      return `${state.usuario.nome} ${state.usuario.sobrenome}`.trim()
    }
  },

  actions: {
    async login({ email, senha, lembrarMe }) {
      this.carregando = true

      try {
        const { data } = await api.post('/auth/login', {
          email,
          senha,
          lembrarMe,
        })

        console.log('=== LOGIN - DADOS DO SERVIDOR ===')
        console.log('Usuário do servidor:', data.usuario)

        const configKey = `user_config_${data.usuario.email}`
        const configSalva = localStorage.getItem(configKey)
        
        console.log('Configurações salvas para este email:', configSalva)
        
        let dadosPersonalizados = null
        if (configSalva) {
          try {
            dadosPersonalizados = JSON.parse(configSalva)
            console.log('Dados personalizados encontrados:', dadosPersonalizados)
          } catch (e) {
            console.error('Erro ao processar configurações salvas:', e)
          }
        }

        this.usuario = {
          ...data.usuario,
          ...(dadosPersonalizados || {})
        }
        
        console.log('Usuário final mesclado:', this.usuario)
        
        this.token = data.token
        this.autenticado = true

        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(this.usuario))
        
        console.log('Salvo no localStorage:', localStorage.getItem('usuario'))

        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken)
        }

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
      const usuario = localStorage.getItem('usuario')

      if (token && usuario) {
        try {
          this.token = token
          this.usuario = JSON.parse(usuario)
          this.autenticado = true
        
        } catch {
          this.logout()
        }
      }
    },

    updateUser(userData) {
      console.log('=== UPDATE USER ===')
      console.log('Dados recebidos:', userData)
      console.log('Usuário antes:', this.usuario)
      
      if (this.usuario) {
        this.usuario = {
          ...this.usuario,
          ...userData
        }

        if (userData.nome || userData.sobrenome) {
          this.usuario.nomeCompleto = `${this.usuario.nome} ${this.usuario.sobrenome}`.trim()
        }

        console.log('Usuário depois:', this.usuario)

        localStorage.setItem('usuario', JSON.stringify(this.usuario))
        
        const configKey = `user_config_${this.usuario.email}`
        const configPersonalizada = {
          nome: this.usuario.nome,
          sobrenome: this.usuario.sobrenome,
          nomeCompleto: this.usuario.nomeCompleto,
          preferences: this.usuario.preferences,
          urlFotoPerfil: this.usuario.urlFotoPerfil
        }
        localStorage.setItem(configKey, JSON.stringify(configPersonalizada))
        
        console.log('Salvo no localStorage:', localStorage.getItem('usuario'))
        console.log(`Configurações salvas em ${configKey}:`, localStorage.getItem(configKey))
      }
    },

    updatePreferences(preferences) {
      if (this.usuario) {
        this.usuario.preferences = {
          ...this.usuario.preferences,
          ...preferences
        }

        localStorage.setItem('usuario', JSON.stringify(this.usuario))
        
        const configKey = `user_config_${this.usuario.email}`
        const configAtual = localStorage.getItem(configKey)
        let config = configAtual ? JSON.parse(configAtual) : {}
        config.preferences = this.usuario.preferences
        localStorage.setItem(configKey, JSON.stringify(config))
      }
    },

    carregarPreferenciasLocais() {
      const usuarioLocal = localStorage.getItem('usuario')
      
      if (usuarioLocal && this.usuario) {
        try {
          const dadosLocais = JSON.parse(usuarioLocal)
          
          if (dadosLocais.email === this.usuario.email) {
            
            if (dadosLocais.nome) this.usuario.nome = dadosLocais.nome
            if (dadosLocais.sobrenome) this.usuario.sobrenome = dadosLocais.sobrenome
            if (dadosLocais.nomeCompleto) this.usuario.nomeCompleto = dadosLocais.nomeCompleto
            if (dadosLocais.preferences) this.usuario.preferences = dadosLocais.preferences
            if (dadosLocais.urlFotoPerfil) this.usuario.urlFotoPerfil = dadosLocais.urlFotoPerfil
            
            localStorage.setItem('usuario', JSON.stringify(this.usuario))
          }
        } catch (error) {
          console.error('Erro ao carregar preferências locais:', error)
        }
      }
    },

    updateProfilePhoto(url) {
      if (this.usuario) {
        this.usuario.urlFotoPerfil = url
        localStorage.setItem('usuario', JSON.stringify(this.usuario))
      }
    },

    logout() {

      const email = this.usuario?.email
      
      this.usuario = null
      this.token = null
      this.autenticado = false

      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      localStorage.removeItem('refreshToken')
      
      console.log(`Logout realizado. Configurações de ${email} foram preservadas.`)
    }
  }
})