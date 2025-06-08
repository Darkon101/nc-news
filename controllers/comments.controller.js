const { fetchCommentsById } = require("../models/comments.model")

const getCommentsById = (req, res, next) => {
    const {article_id} = req.params

    return fetchCommentsById(article_id).then((comments)=>{
        res.status(200).send({comments})
    }).catch((err)=>{
        next(err)
    })
}

module.exports = {getCommentsById}