const connection = require('../db/connection');

exports.selectArticles = ({sort_by = 'created_at',order = 'desc', ...otherQueries}) => {
   return connection('articles')
    .select('articles.author', 'articles.body', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comment_id AS comment_count')
    .where(otherQueries)
    .orderBy(sort_by, order)
   ;
};

exports.selectSingleArticle = ( articleID ) => {
    return connection('articles')
    .select('articles.author', 'articles.body', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comment_id AS comment_count')
    .where('articles.article_id', '=', articleID)
};

exports.updateSingleArticle = ( articleID, voteChange ) => {
    return connection('articles')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .where('articles.article_id', '=', articleID)
    .increment('votes', voteChange)
    .returning('*')
    .count('comment_id AS comment_count')
};

exports.removeSingleArticle = (articleID) => {
    console.log(articleID);
    return connection('articles')
    .where('article_id', '=', articleID)
    .del()
};

