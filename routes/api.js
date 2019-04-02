const apiRouter = require('express').Router();
const { topicsRouter } = require('./topic')
const { methodNotAllowed } = require('../errors');

console.log(topicsRouter);
apiRouter.use('/topics', topicsRouter)


module.exports =  apiRouter ;
