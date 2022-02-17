const express = require('express');
const cors = require('cors');

const taskRouters = require('./routers/taskRouters');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
}));

app.get('/', (req, res) => res.status(200).send());

app.use('/tasks', taskRouters);

module.exports = app;