const {
  fetchCommentsById,
  createCommentById,
  removeCommentById,
} = require("../models/comments.model");

const getCommentsById = (req, res, next) => {
  const { article_id } = req.params;

  return fetchCommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  return createCommentById(article_id, { username, body })
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params
    return removeCommentById(comment_id).then((deletedComment)=> {
        res.status(204).send({deletedComment})
    }).catch((err)=>{
        next(err)
    })
}

module.exports = { getCommentsById, postCommentById, deleteCommentById};
