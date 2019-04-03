const { selectArticles, selectSingleArticle, updateSingleArticle, removeSingleArticle, selectArticleComments } = require('../models/articles-model')

exports.getArticles = (req, res, next) => {
    selectArticles(req.query).then(articles =>res.status(200).json({ articles }))
};

exports.getSingleArticle = (req, res, next) => {
    selectSingleArticle(req.params.article_id).then(([article]) =>res.status(200).json({ article }))
};

exports.patchSingleArticle = (req, res, next) => {
    updateSingleArticle(req.params.article_id, req.body.inc_votes).then(([article]) =>res.status(200).json({ article }))
};

exports.deleteSingleArticle = (req, res, next) => {
    removeSingleArticle(req.params.article_id).then(() =>res.status(204).json())
};

exports.getArticleComments = (req, res, next) => {
    selectArticleComments(req.params.article_id, req.query).then(comments =>res.status(200).json({ comments }))
};