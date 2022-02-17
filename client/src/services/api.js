import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

const http = {
  getTasks: async (sortType) => {
    try {
      const response = await api.get('/tasks', {
        headers: { sort: JSON.stringify({ ...sortType }) },
      });
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
  createTask: async (payload) => {
    try {
      const response = await api.post('/tasks', { ...payload });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },

};

export default http;
