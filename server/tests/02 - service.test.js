const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');

const taskService = require('../services/taskService');
const taskModel = require('../models/taskModel');

const connection = require('../models/connection');
const connectionStubed = require('./utils/memoryConnection');

const testData = require('./utils/testData');
const describeTest = require('./utils/testDescription');

const dbName = 'tasksModel';
const dbCollection = 'tasks';

async function deleteAllData(myDbName, myDbCollection) {
  await connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

async function insertOneData(myDbName, myDbCollection) {
  return connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).insertOne({ ...testData.newTask }));
}

describe('Task services', function () {
  before(async function () {
    sinon.stub(connection, 'getConnection').resolves(connectionStubed.getConnection());
    sinon.stub(taskModel, 'getAll').resolves([]);
  });
  beforeEach(async function () {
    await deleteAllData(dbName, dbCollection);
  });

  after(async function () {
    sinon.restore();
    connectionStubed.closeConnection();
  });

  it('Basic CRUD function for services', async function () {
    expect(taskService).to.be.an('object');
    Object.values(taskService)
      .forEach((serviceFunc) => expect(serviceFunc).to.be.an('function'));
    expect(taskService).to.have.keys([
      'getAll', 'insertTask', 'editTask', 'deleteTask',
    ]);
  });
  describe('GetFunction', function () {
    it('GetAll working correctly', async function () {
      const allTasks = await taskService.getAll();
      expect(allTasks).to.be.an('array');
      expect(allTasks).to.be.eql([]);
    });
  });

  describe('InsertFunction', function () {
    it('Sucess insertion', async function () {
      const insertedTask = await taskService.insertTask({ ...testData.newTask });
      console.log(insertedTask);
      expect(insertedTask).to.be.an('object');
      expect(insertedTask).to.have.keys(['id', ...Object.keys({ ...testData.newTask })]);
    });
    it('Failed insertion: task is not an object', async function () {
      const insertedTask = await taskService.insertTask(0);
      expect(insertedTask).to.be.an('object');
      expect(insertedTask).to.includes.keys(['isError']);
      expect(insertedTask).to.includes.keys(['message']);
      expect(insertedTask.isError).to.be.eq(true);
    });
    it('Failed insertion: task is an empty object', async function () {
      const insertedTask = await taskService.insertTask({ });
      expect(insertedTask).to.be.an('object');
      expect(insertedTask).to.includes.keys(['isError']);
      expect(insertedTask).to.includes.keys(['message']);
      expect(insertedTask.isError).to.be.eq(true);
    });
    function wrongTypesForInsertion(nameProperty, value) {
      return async function () {
        const TaskByPropertiesError = await taskService.insertTask({ [nameProperty]: value });

        expect(TaskByPropertiesError).to.be.an('object');
        expect(TaskByPropertiesError).to.includes.keys(['isError']);
        expect(TaskByPropertiesError).to.includes.keys(['message']);
        expect(TaskByPropertiesError.isError).to.be.eq(true);
      };
    }
    describe('Insertion check parameters', function () {
      it(describeTest.ActionWrongDataType, wrongTypesForInsertion('action', 1));
      it(describeTest.ActionRigthDataTypeButEmptyString, wrongTypesForInsertion('action', ''));
      it(describeTest.ResponsibleWrongDataType, wrongTypesForInsertion('responsible', 1));
      it(describeTest.ResponsibleRigthDataTypeButEmptyString,
        wrongTypesForInsertion('responsible', ''));
      it(describeTest.StatusWrongDataType, wrongTypesForInsertion('status', 1));
      it(describeTest.StatusRigthDataTypeButEmptyString, wrongTypesForInsertion('status', ''));
      it(describeTest.CreatedAtWrongDataType, wrongTypesForInsertion('createdAt', 1));
      it(describeTest.CreatedAtEmpty, wrongTypesForInsertion('createdAt', ''));

      it('Missing properties', async function () {
        const missingPropertyTask = { ...testData.newTask };
        delete missingPropertyTask.status;

        const taskByPropertiesError1 = await taskService.insertTask(missingPropertyTask, true);

        expect(taskByPropertiesError1).to.be.an('object');
        expect(taskByPropertiesError1).to.contains.keys(['isError', 'message']);
        expect(taskByPropertiesError1.isError).to.be.eq(true);
      });
    });
  });

  describe('EditFunction', function () {
    it('Sucess insertion', async function () {
      const addedTask = await insertOneData(dbName, dbCollection);
      const editedTask = await taskService
        .editTask({ ...testData.editedTask, id: addedTask.insertedId });
      expect(editedTask).to.be.an('object');
      expect(editedTask).to.have.keys(['id', ...Object.keys({ ...testData.editedTask })]);
    });
    function wrongTypesForEdition(nameProperty, value) {
      return async function () {
        const TasksByPropertiesError = await taskService.editTask({ [nameProperty]: value });

        expect(TasksByPropertiesError).to.be.an('object');
        expect(TasksByPropertiesError).to.have.keys(['isError']);
        expect(TasksByPropertiesError.isError).to.be.eq(true);
      };
    }
    describe('Edition check parameters', function () {
      it(describeTest.ActionWrongDataType, wrongTypesForEdition('action', 1));
      it(describeTest.ActionRigthDataTypeButEmptyString, wrongTypesForEdition('action', ''));
      it(describeTest.ResponsibleWrongDataType, wrongTypesForEdition('responsible', 1));
      it(describeTest.ResponsibleRigthDataTypeButEmptyString,
        wrongTypesForEdition('responsible', ''));
      it(describeTest.StatusWrongDataType, wrongTypesForEdition('status', 1));
      it(describeTest.StatusRigthDataTypeButEmptyString, wrongTypesForEdition('status', ''));
      it(describeTest.CreatedAtWrongDataType, wrongTypesForEdition('createdAt', 1));
      it(describeTest.CreatedAtEmpty, wrongTypesForEdition('createdAt', ''));
    });
  });

  describe('DeleteFunction', function () {
    it('Sucess deletion', async function () {
      const addedTask = await insertOneData(dbName, dbCollection);

      const editedTask = await taskService.deleteTask(addedTask.insertedId);

      expect(editedTask).to.be.an('object');
      expect(editedTask).to.have.keys(['message']);
    });
    
    describe('delete check parameters', function () {
      it('Missing id', async function () {
        const editedTask = await taskService.deleteTask();

        expect(editedTask).to.be.an('object');
        expect(editedTask).to.have.keys(['isError']);
      });
      it('wrong formart id', async function () {
        const editedTask = await taskService.deleteTask('1');

        expect(editedTask).to.be.an('object');
        expect(editedTask).to.have.keys(['isError']);
      });

      it('Right id, but not exist in the bank', async function () {
        const editedTask = await taskService.deleteTask(ObjectId.generate());

        expect(editedTask).to.be.an('object');
        expect(editedTask).to.have.keys(['isError']);
      });
    });
  });
});