const mongo = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connection = null;
let mongoServer;
const getConnection = async (dbName) => {
  mongoServer = await MongoMemoryServer.create();
  mongoServer.start();
  const dbUrl = mongoServer.getUri();
  connection = connection || await new mongo.MongoClient(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect();
  return connection.db(dbName);
};

const closeConnection = () => {
  mongoServer.stop();
  connection = null;
};

module.exports = { getConnection, closeConnection };