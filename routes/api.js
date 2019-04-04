const apiRouter = require('express').Router();
const { topicsRouter } = require('./topic')
const { articlesRouter } = require('./article')
const { commentsRouter } = require('./comment')
const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)


module.exports =  apiRouter ;
