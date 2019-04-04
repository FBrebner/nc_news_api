const commentsRouter = require('express').Router();
const {patchSingleComment, deleteSingleComment} = require('../controllers/comments-controller');
const { methodNotAllowed } = require('../errors')

commentsRouter.route('/:comment_id').patch(patchSingleComment).delete(deleteSingleComment).all(methodNotAllowed);

module.exports =  { commentsRouter };