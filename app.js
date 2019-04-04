const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500, handle404, handle400, handlePSQLErrors } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handle404);

app.use(handle400);

app.use(handlePSQLErrors)

app.use(handle500);

module.exports = app;
