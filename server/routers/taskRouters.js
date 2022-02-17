const { Router } = require('express');
const { 
  getAll,
  insertTask,
  editTask,
  deleteTask,
  } = require('../controllers/taskController');

const taskRouters = Router();

taskRouters.get('/', getAll);
taskRouters.post('/', insertTask);
taskRouters.put('/', editTask);
taskRouters.delete('/', deleteTask);

module.exports = taskRouters;