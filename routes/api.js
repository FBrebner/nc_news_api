const apiRouter = require('express').Router();
const { topicsRouter } = require('./topic')
const { articlesRouter } = require('./article')
const { commentsRouter } = require('./comment')
const { usersRouter } = require('./user')
const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)

module.exports =  apiRouter ;
