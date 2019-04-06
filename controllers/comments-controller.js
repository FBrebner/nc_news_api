const {updateSingleComment, removeSingleComment} = require('../models/comments-model')

exports.patchSingleComment = (req, res, next) => {
    if (Number.isNaN(+req.params.comment_id)) {next({ status: 400})} else {
    updateSingleComment(req.params.comment_id, req.body.inc_votes).then(([comment]) =>{ 
        if (!comment) {next({ status: 404})} else {res.status(200).json({ comment })}})
    }
};

exports.deleteSingleComment = (req, res, next) => {

    if (Number.isNaN(+req.params.comment_id) || (Number.isNaN(+req.body.inc_votes) && req.body.inc_votes!==undefined)) {next({ status: 400})} else {
    removeSingleComment(req.params.comment_id).then((check) =>{ 
        if (!check) {next({ status: 404})} else {res.status(204).json()}})
    }
};
