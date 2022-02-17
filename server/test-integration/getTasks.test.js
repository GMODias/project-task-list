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

describe('GetTaskFunction', function () {
  describe('Sucess cases', function () {
    describe('GetAll', function () {
      let response;

      before(async function () {
        sinon
          .stub(connection, 'getConnection')
          .resolves(connectionStubed.getConnection());
        await insertOneData(dbName, dbCollection);
        response = await chai.request(server).get('/tasks');
      });

      after(cleanDescribe);

      it('return status 200', function () {
        expect(response).to.have.status(200);
      });

      it('be a object objeto', function () {
        expect(response).to.be.an('object');
      });

      it('response body be an array', function () {
        expect(response.body).to.be.an('array');
      });

      it('Object inside array contain basic properties', function () {
        expect(response.body[0]).to.have.all.keys([
          'id',
          'action',
          'status',
          'responsible',
          'createdAt',
        ]);
      });
    });
  });
});