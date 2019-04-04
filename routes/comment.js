const commentsRouter = require('express').Router();
const {patchSingleComment, deleteSingleComment} = require('../controllers/comments_controller');

commentsRouter.route('/:comment_id').patch(patchSingleComment).delete(deleteSingleComment);

module.exports =  { commentsRouter };