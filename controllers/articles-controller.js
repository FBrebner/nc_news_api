const { selectArticles, selectSingleArticle, updateSingleArticle } = require('../models/articles-model')

exports.getArticles = (req, res, next) => {
    selectArticles(req.query).then(articles =>res.status(200).json({ articles }))
};

exports.getSingleArticle = (req, res, next) => {
    selectSingleArticle(req.params.article_id).then(([article]) =>res.status(200).json({ article }))
};

exports.patchSingleArticle = (req, res, next) => {
    updateSingleArticle(req.params.article_id, req.body.inc_votes).then(([article]) =>res.status(200).json({ article }))
};