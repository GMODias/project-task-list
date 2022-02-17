const taskService = require('../services/taskService');

const getAll = async (req, res) => {
  const { headers: { sort } } = req;
  const tasks = await taskService.getAll(JSON.parse(sort));

  return res.status(200).json(tasks);
};

const insertTask = async (req, res) => {
  const { body } = req;
  const task = await taskService.insertTask(body);
  if (task.isError) return res.status(422).json(task);

  return res.status(201).json(task);
};

const editTask = async (req, res) => {
  const { body } = req;
  const task = await taskService.editTask(body);
  if (task.isError) return res.status(422).json(task);
  
  return res.status(204).json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.body;
  const task = await taskService.deleteTask(id);
  if (task.isError) return res.status(422).json(task);

  return res.status(202).json(task);
};

module.exports = { getAll, insertTask, editTask, deleteTask };