const apiRouter = require('express').Router();
const { topicsRouter } = require('./topic')
const { articlesRouter } = require('./article')
const { commentsRouter } = require('./comment')
const { usersRouter } = require('./user')
const { showAllEndpoints } = require('../controllers/api-controller')
const { methodNotAllowed } = require('../errors');


apiRouter.get('/', showAllEndpoints)
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)

module.exports =  apiRouter ;
