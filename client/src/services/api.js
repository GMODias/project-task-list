import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

const http = {
  getTasks: async () => {
    try {
      const response = await api.get('/tasks', {});
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await api.delete('/tasks', { data: { id } });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  editTask: async (payload) => {
    try {
      const response = await api.put('/tasks', { ...payload });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },

};

export default http;
