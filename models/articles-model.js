const connection = require('../db/connection');

exports.selectArticles = ({sort_by = 'created_at',order = 'desc', ...otherQueries}) => {
   return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comment_id AS comment_count')
    .where(otherQueries)
    .orderBy(sort_by, order)
   ;
};

exports.selectSingleArticle = ( articleID ) => {
    return connection
    .select('articles.author', 'title', 'articles.article_id', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comment_id AS comment_count')
    .where('articles.article_id', '=', articleID)
};