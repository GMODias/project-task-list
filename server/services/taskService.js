const { ObjectId } = require('mongodb');
const taskModel = require('../models/taskModel');
const { isInvalidTaskProperties, haveAllProperties } = require('./utils');

const getAll = async () => taskModel.getAll();

const insertTask = async (task) => {
  const isInvalidTaskPropertiesState = isInvalidTaskProperties(task);
  if (isInvalidTaskPropertiesState) {
    return { isError: true, ...isInvalidTaskPropertiesState };
  }
  if (!haveAllProperties(task)) return { isError: true, message: 'Não tem todas as propriedades' };
  const insertedTask = await taskModel.insertTask({ ...task });
  return { ...task, id: insertedTask.insertedId };
};

const editTask = async (task) => {
  const allPropertiesValid = isInvalidTaskProperties(task);
  if (allPropertiesValid) {
    return { isError: true };
  }
  await taskModel.editTask(task);
  return { ...task };
};

const deleteTask = async (id) => {
  if (!id || !ObjectId.isValid(id)) {
    return { isError: true };
  }
  const deletedTask = await taskModel.deleteTask(id);
  if (!deletedTask.deletedCount) {
    return { isError: true };
  }
  return { message: `Tarefa de id ${id} deletada` };
};

module.exports = { getAll, insertTask, editTask, deleteTask };