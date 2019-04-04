const connection = require('../db/connection');

exports.updateSingleComment = ( commentID, voteChange ) => {
    return connection('comments')
    .from('comments')
    .leftJoin('comments', 'comments.comment_id', '=', 'comments.comment_id')
    .groupBy('comments.comment_id')
    .where('comments.comment_id', '=', commentID)
    .increment('votes', voteChange)
    .returning('*')
    .count('comment_id AS comment_count')
};

exports.removeSingleComment = (commentID) => {
    return connection('comments')
    .where('comment_id', '=', commentID)
    .del()
};