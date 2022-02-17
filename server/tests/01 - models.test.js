const { expect } = require('chai');
const taskModel = require('../models/taskModel');
const connection = require('../models/connection');

const dbName = 'tasksModel';
const dbCollection = 'tasks';

const actionBase = {
  action: 'Escovar os dentes',
  responsible: 'João',
  status: 'PENDENTE',
};

async function deleteAllData(myDbName, myDbCollection) {
  await connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

describe('Tasks model tests', function () {
  describe('Checking basic function', function () { 
    beforeEach(async function () {
      await deleteAllData(dbName, dbCollection);
    });
    
    it('Basic CRUD functions for task model', async function () {
      expect(taskModel).to.be.an('object');
      expect(taskModel).to.have.all.keys([
        'getAll', 'insertTask', 'editTask', 'deleteTask',
      ]);
      Object.values(taskModel)
        .forEach((basicFunc) => expect(basicFunc).to.be.an('function'));
    });

    it('Testing getAll Function', async function () {
      const allTasks = await taskModel.getAll();
      expect(allTasks).to.be.an('array');
    });

    it('Testing insertTask Function', async function () {     
      let allTasks = await taskModel.getAll();
      expect(allTasks).to.be.length(0);
      const newTask = {
        ...actionBase,
        createdTime: new Date(),
      };
      const task = await taskModel.insertTask(newTask);
      expect(task).to.be.an('object');
      expect(task.acknowledged).to.be.eq(true);
      allTasks = await taskModel.getAll();
      expect(allTasks).to.be.length(1);
      const { id } = allTasks[0];
      expect(id).to.be.eql(task.insertedId);
    });

    it('Testing editTask Function', async function () {
      let allTasks = await taskModel.getAll();
      expect(allTasks).to.be.length(0);
      const newTask = {
        ...actionBase,
        createdTime: new Date(),
      };
      const task = await taskModel.insertTask(newTask);
      expect(task).to.be.an('object');
      expect(task.acknowledged).to.be.eq(true);
      allTasks = await taskModel.getAll();
      expect(allTasks).to.be.length(1);
      const { id } = allTasks[0];
      expect(id).to.be.eql(task.insertedId);

      const editedTask = await taskModel.editTask({ 
        id, ...newTask, status: 'EM ANDAMENTO', 
      });
      expect(editedTask).to.be.an('object');
      expect(editedTask.acknowledged).to.be.eq(true);
      expect(editedTask.modifiedCount).to.be.eq(1);
      expect(editedTask.upsertedCount).to.be.eq(0);
    });
    it('Testing deleteTask Function', async function () {
      let allTasks = await taskModel.getAll();
      expect(allTasks).to.be.length(0);
      const newTask = {
        ...actionBase,
        createdTime: new Date(),
      };
      const task = await taskModel.insertTask(newTask);
      expect(task).to.be.an('object');
      expect(task.acknowledged).to.be.eq(true);
      allTasks = await taskModel.getAll();
      expect(allTasks).to.be.length(1);
      const { id } = allTasks[0];
      expect(id).to.be.eql(task.insertedId);

      const deletedTask = await taskModel.deleteTask(id);
      expect(deletedTask).to.be.an('object');
      expect(deletedTask.acknowledged).to.be.eq(true);
      expect(deletedTask.deletedCount).to.be.eq(1);
    });
  });
});