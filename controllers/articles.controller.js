const { fetchArticles, fetchArticleById, updateArticleById } = require("../models/articles.model")

const getArticles = (req, res, next) =>{
    const {sort_by, order, topic} = req.query
    return fetchArticles(sort_by, order, topic).then((articles)=>{
        res.status(200).send({articles})
    }).catch((err)=>{
        next(err)
    })
}

const getArticleById = (req,res,next) => {
    const {article_id} = req.params
    
    return fetchArticleById(article_id).then((article)=>{
        res.status(200).send({article})
    }).catch((err)=>{
        next(err)
    })
}

const patchArticleById = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body

    return updateArticleById(article_id, inc_votes).then((patchedArticle)=>{
        res.status(200).send({patchedArticle})
    }).catch((err)=>{
        next(err)
    })
}

module.exports = {getArticles, getArticleById, patchArticleById}