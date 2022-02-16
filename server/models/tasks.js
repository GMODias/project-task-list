const connection = require('./connection');

const dbName = 'tasksModel';
const dbCollection = 'tasks';

const getAll = async () => {
  const allTasks = await (await connection.getConnection(dbName))
    .collection(dbCollection).find().toArray();
  return allTasks.map(({ _id: id, ...restTask }) => ({ id, restTask }));
};

const insertTask = async (task) => 
  (await connection.getConnection(dbName)).collection(dbCollection).insertOne(task);

const editTask = async (task) => {
  const { id } = task;
  return (await connection.getConnection(dbName))
    .collection(dbCollection).updateOne({ _id: id }, { $set: { ...task } });
};
const deleteTask = async (id) => 
  (await connection.getConnection(dbName)).collection(dbCollection).deleteOne({ _id: id });
  
module.exports = { getAll, insertTask, editTask, deleteTask };