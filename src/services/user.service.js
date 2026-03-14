import api from './api';

export default {
  getUserData() {
    return api.get('/users/perfil');
  },

  updateProfile(data) {
    return api.put('/users/atualizar', {
      nome: data.nome,
      sobrenome: data.sobrenome
    });
  },

  updateEmail(data) {
    return api.put('/users/email', {
      novoEmail: data.novoEmail,
      senhaAtual: data.senhaAtual
    });
  },

  updatePreferences(data) {
    return api.put('/users/preferencias', {
      notifications: data.notifications
    });
  },

  changePassword(data) {
    return api.put('/users/alterar-senha', {
      senhaAtual: data.senhaAtual,
      novaSenha: data.novaSenha
    });
  },

  deleteAccount() {
    return api.delete('/users/deletar');
  }
};