const {updateSingleComment, removeSingleComment} = require('../models/comments-model')

exports.patchSingleComment = (req, res, next) => {
    updateSingleComment(req.params.comment_id, req.body.inc_votes).then(([comment]) =>res.status(200).json({ comment }))
};

exports.deleteSingleComment = (req, res, next) => {
    removeSingleComment(req.params.comment_id).then(() =>res.status(204).json())
};
