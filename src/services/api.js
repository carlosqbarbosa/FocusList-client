import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken
          });

          localStorage.setItem('token', data.data.token);
          localStorage.setItem('refreshToken', data.data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.data.token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Se refresh falhou, redireciona para login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // Sem refresh token, redireciona para login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const auth = {
  register: async (userData) => {
    const response = await api.post('/auth/register', {
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      email: userData.email,
      senha: userData.senha
    });
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      senha: credentials.senha,
      lembrarMe: credentials.lembrarMe || false
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  verificarToken: async () => {
    const response = await api.get('/auth/verificar-token');
    return response.data;
  }
};

export const user = {
  getPerfil: async () => {
    const response = await api.get('/users/perfil');
    return response.data;
  },

  atualizar: async (dados) => {
    const response = await api.put('/users/atualizar', dados);
    return response.data;
  },

  alterarSenha: async (senhas) => {
    const response = await api.put('/users/alterar-senha', senhas);
    return response.data;
  }
};

export const getDashboardData = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  } catch (error) {
    console.warn('Usando dados mock para dashboard');
    return {
      tasksToday: 5,
      pending: 12,
      late: 3,
      completedThisMonth: [30, 45, 60, 40, 70, 50],
    };
  }
};

export default api;