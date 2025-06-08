const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};


exports.createArticleRef = (articles, title, article_id) => {
  const ref = {}

  for(let article of articles){
    const titleRef = article[title]
    const article_idRef = article[article_id]
    ref[titleRef] = article_idRef
  }

  return ref
}

exports.formatComments = (comments, articleRef) => {
  const formattedComments = []
  for(let comment of comments){
    const article_id = articleRef[comment.article_title]
    formattedComments.push({...this.convertTimestampToDate(comment), article_id})
  }
  return formattedComments
}



