const { fetchArticles, fetchArticleById } = require("../models/articles.model")

const getArticles = (req, res) =>{
    return fetchArticles().then((articles)=>{
        res.status(200).send({articles})
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

module.exports = {getArticles, getArticleById}