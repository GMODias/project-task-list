const express = require('express');

const taskRouters = require('./routers/taskRouters');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).send());

app.use('/tasks', taskRouters);

module.exports = app;