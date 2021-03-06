const mongo = require('mongodb');
require('dotenv').config();

let connection = null;

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/TasksList`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async (dbName) => {
    connection = connection || await new mongo.MongoClient(MONGO_DB_URL, OPTIONS).connect();
    return connection.db(dbName);
};

module.exports = { getConnection };