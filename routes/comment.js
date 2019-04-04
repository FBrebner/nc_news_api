const commentsRouter = require('express').Router();
const {patchSingleComment, deleteSingleComment} = require('../controllers/comments-controller');

commentsRouter.route('/:comment_id').patch(patchSingleComment).delete(deleteSingleComment);

module.exports =  { commentsRouter };