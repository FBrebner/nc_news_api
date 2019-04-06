const { selectArticles, selectSingleArticle, updateSingleArticle, removeSingleArticle, selectArticleComments, addArticleComment } = require('../models/articles-model')

exports.getArticles = (req, res, next) => {
    selectArticles(req.query).then(articles =>res.status(200).json({ articles }))
    .catch(next)
};

exports.getSingleArticle = (req, res, next) => {
    if (Number.isNaN(+req.params.article_id)) {next({ status: 400})} else {
    selectSingleArticle(req.params.article_id).then(([article]) => {
        if (!article) {next({ status: 404})} else{ (res.status(200).json({ article }))}})
    }
};

exports.patchSingleArticle = (req, res, next) => {
    if (Number.isNaN(+req.params.article_id) || (Number.isNaN(+req.body.inc_votes) && req.body.inc_votes!==undefined)) {next({ status: 400})} else {
    updateSingleArticle(req.params.article_id, req.body.inc_votes).then(([article]) =>{ 
        if (!article) {next({ status: 404})} else {res.status(200).json({ article })}})
    }
};

exports.deleteSingleArticle = (req, res, next) => {
    if (Number.isNaN(+req.params.article_id)) {next({ status: 400})} else {
    removeSingleArticle(req.params.article_id).then((check) =>{ 
        if (!check) {next({ status: 404})} else {res.status(204).json()}})
    }
};

exports.getArticleComments = (req, res, next) => {
    if (Number.isNaN(+req.params.article_id)) {next({ status: 400})} else {
    selectArticleComments(req.params.article_id, req.query).then(comments =>{ 
        if (!comments.length) {next({ status: 404})} else {res.status(200).json({ comments })}})
    }
};

exports.postArticleComment = (req, res, next) => {
    if (Number.isNaN(+req.params.article_id)) {next({ status: 400})} else {
    addArticleComment(req.params.article_id, req.body).then(([comment]) =>res.status(201).json({ comment }))
        .catch(next)
    }
    
};