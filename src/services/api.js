import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
/*
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        limparSessao();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { token, refreshToken: newRefreshToken } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        limparSessao();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);*/ 

function limparSessao() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('usuario');
}

export const auth = {
  register: async (userData) => {
    const response = await api.post('/auth/register', {
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      email: userData.email,
      senha: userData.senha,
    });

    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      senha: credentials.senha,
      lembrarMe: credentials.lembrarMe || false,
    });

    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      limparSessao();
    }
  },

  verificarToken: async () => {
    const response = await api.get('/auth/verificar-token');
    return response.data;
  },
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
  },
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
