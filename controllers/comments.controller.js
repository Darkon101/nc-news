const { fetchCommentsById, createCommentById } = require("../models/comments.model")

const getCommentsById = (req, res, next) => {
    const {article_id} = req.params

    return fetchCommentsById(article_id).then((comments)=>{
        res.status(200).send({comments})
    }).catch((err)=>{
        next(err)
    })
}

const postCommentById = (req, res, next) => {
    const {article_id} = req.params
    const {username, body} = req.body

    return createCommentById(article_id, {username, body}).then((postedComment) => {
        res.status(201).send({postedComment})
    }).catch((err)=>{
        next(err)
    })
}

module.exports = {getCommentsById, postCommentById}