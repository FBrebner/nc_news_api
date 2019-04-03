const apiRouter = require('express').Router();
const { topicsRouter } = require('./topic')
const { articlesRouter } = require('./article')
const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)


module.exports =  apiRouter ;
