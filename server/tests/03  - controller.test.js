const sinon = require('sinon');
const { expect } = require('chai');

const { ObjectId } = require('mongodb');
const taskController = require('../controllers/taskController');
const taskService = require('../services/taskService');
const { newTask, editedTask } = require('./utils/testData');
const { getConnection, closeConnection } = require('./utils/memoryConnection');

const dbName = 'tasksModel';
const dbCollection = 'tasks';

async function deleteAllData(myDbName, myDbCollection) {
  await getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

describe('Task controller', function () {
  before(async function () {
    await deleteAllData(dbName, dbCollection);
  });

  after(async function () {
    sinon.restore();
    closeConnection();
  });
  describe('Geral', function () {
    const response = {};
    function basicInit() {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    }
    beforeEach(basicInit);
    it('Basic structure', async function () {
      expect(taskController).to.be.an('object');
      expect(taskController).to.have.keys([
        'getAll', 'insertTask', 'editTask', 'deleteTask',
      ]);
      Object.values(taskController)
      .forEach((controllerFunction) => expect(controllerFunction).to.be.an('function'));
    });
  });
  describe('GetFunctions', function () {
    describe('GetAll working correctly', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        id = ObjectId.generate();
        taskService.getAll = sinon.stub().returns([{ ...newTask, id }]);
      });
      
      it('GetAll working correctly', async function () {
        await taskController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith([{ ...newTask, id }])).to.be.equal(true);
      });
    });
  });
  describe('InsertFunction', function () {
    describe('Sucess insertion', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        id = ObjectId.generate();
        request.body = { ...newTask, id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        taskService.insertTask = sinon.stub().returns({ ...newTask, id });
      });
      
      it('InsertionTask working correctly', async function () {
        await taskController.insertTask(request, response);

        expect(taskService.insertTask.calledWith({ ...request.body }));
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith({ ...newTask, id })).to.be.equal(true);
      });
    });

    it('InsertionTask without parameter ', async function () {
        const response = { };
        const request = { body: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        taskService.insertTask = sinon.stub().returns(returnService);
        
        await taskController.insertTask(request, response);

        expect(taskService.insertTask.calledWith({})).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
    it('InsertionTask with not allowed parameter', async function () {
      const response = { };
      const request = { body: { status: 'PENDENTE' } };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      const returnService = { isError: true };
      taskService.insertTask = sinon.stub().returns(returnService);

      await taskController.insertTask(request, response);

      expect(taskService.insertTask.calledWith({ status: 'PENDENTE' })).to.be.equal(true);
      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
  describe('EditFunction', function () {
    describe('Sucess insertion', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        id = ObjectId.generate();
        request.body = { ...editedTask, id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        taskService.editTask = sinon.stub().returns({ ...editedTask, id });
      });
      
      it('EditTask working correctly', async function () {
        await taskController.editTask(request, response);

        expect(taskService.editTask.calledWith({ ...request.body }));
        expect(response.status.calledWith(204)).to.be.equal(true);
        expect(response.json.calledWith({ ...editedTask, id })).to.be.equal(true);
      });
    });

    it('EditTask without parameter ', async function () {
        const response = { };
        const request = { body: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        taskService.editTask = sinon.stub().returns(returnService);
        
        await taskController.editTask(request, response);

        expect(taskService.editTask.calledWith({})).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
    it('EditTask with not allowed parameter', async function () {
      const response = { };
      const request = { body: { status: 'PENDENTE' } };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      const returnService = { isError: true };
      taskService.editTask = sinon.stub().returns(returnService);

      await taskController.editTask(request, response);

      expect(taskService.editTask.calledWith({ status: 'PENDENTE' })).to.be.equal(true);
      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
  describe('DeleteFunction', function () {
    describe('Sucess deletion', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        id = ObjectId.generate();
        request.body = { id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        taskService.deleteTask = sinon.stub().returns({ message: `Tarefa de id ${id} deletada` });
      });
      
      it('DeleteTask working correctly', async function () {
        await taskController.deleteTask(request, response);

        expect(taskService.deleteTask.calledWith(id));
        expect(response.status.calledWith(202)).to.be.equal(true);
        expect(response.json
          .calledWith({ message: `Tarefa de id ${id} deletada` })).to.be.equal(true);
      });
    });

    it('DeleteTask without parameter ', async function () {
        const response = { };
        const request = { body: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        taskService.deleteTask = sinon.stub().returns(returnService);
        
        await taskController.deleteTask(request, response);

        expect(taskService.deleteTask.calledWith(undefined)).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
});