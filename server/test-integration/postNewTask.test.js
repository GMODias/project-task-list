const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const connection = require('../models/connection');
const connectionStubed = require('../tests/utils/memoryConnection');

const server = require('../app');
const testData = require('../tests/utils/testData');

const { expect } = chai;
chai.use(chaiHttp);

const dbName = 'tasksModel';
const dbCollection = 'tasks';

async function insertOneData(myDbName, myDbCollection) {
  return connection
    .getConnection(myDbName)
    .then((db) =>
      db.collection(myDbCollection).insertOne({ ...testData.newTask }));
}
async function deleteAllData(myDbName, myDbCollection) {
  await connection
    .getConnection(myDbName)
    .then((db) => db.collection(myDbCollection).deleteMany({}));
}

async function cleanDescribe() {
  await deleteAllData(dbName, dbCollection);
  await connectionStubed.closeConnection();

  sinon.restore();
}

describe('PostNewTask', function () {
  describe('Fail cases', function () {
    function checkProperties(key, value) {
      return function () {
        let response;

        before(async function () {
          sinon
            .stub(connection, 'getConnection')
            .resolves(connectionStubed.getConnection());
          await insertOneData(dbName, dbCollection);
          response = await chai
            .request(server)
            .post('/tasks')
            .send({ [key]: value });
        });

        after(cleanDescribe);

        it('return status 422', function () {
          expect(response).to.have.status(422);
        });

        it('be a object objeto', function () {
          expect(response).to.be.an('object');
        });

        it('response body be an array', function () {
          expect(response.body).to.be.an('object');
        });

        // it('Object inside array contain basic properties', function () {
        //   expect(response.body[0]).to.have.all.keys([
        //     'id',
        //     'type',
        //     'brand',
        //     'model',
        //     'version',
        //     'year',
        //     'mileage',
        //     'transmissionType',
        //     'sellPrice',
        //     'dateReference',
        //   ]);
        // });
      };
    }
    Object.entries(testData.newTask).forEach(([key, value]) => {
      describe(`Post New Task ${key} ${value} `, checkProperties(key, value));
    });
  });

  describe('Sucess cases', function () {
    function checkProperties() {
      return function () {
        let response;

        before(async function () {
          sinon
            .stub(connection, 'getConnection')
            .resolves(connectionStubed.getConnection());
          await insertOneData(dbName, dbCollection);
          response = await chai
            .request(server)
            .post('/tasks')
            .send(testData.newTask);
        });

        after(cleanDescribe);

        it('return status 201', function () {
          expect(response).to.have.status(201);
        });

        it('be a object objeto', function () {
          expect(response).to.be.an('object');
        });

        it('response body be an array', function () {
          expect(response.body).to.be.an('object');
        });

        it('Object inside array contain all basic properties', function () {
          expect(response.body).to.contains.keys([...Object.keys(testData.newTask), 'id']);
        });
      };
    }
      describe('Post New Task ', checkProperties());
  });
});