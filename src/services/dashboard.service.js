import api from './api'; 

export default {
  getSummary() {
    return api.get('/dashboard/summary');
  },

  getTasksByMonth() {
    return api.get('/dashboard/month');
  },

  getUpcomingTasks() {
    return api.get('/dashboard/upcoming');
  },

  getOverdueTasks() {
    return api.get('/dashboard/overdue');
  }
};
