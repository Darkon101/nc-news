const db = require("../db/connection");

const fetchArticles = (sort_by, order) => {
  const sortColumnQueries = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];

  const orderQueries = ['ASC', 'DESC']

  if(sort_by && !sortColumnQueries.includes(sort_by)){
    return Promise.reject({
      status: 400,
      msg: `Invalid input`
    })
  }
   if(order && !orderQueries.includes(order)){
    return Promise.reject({
      status: 400,
      msg: `Invalid input`
    })
  }

  const sortQuery = sort_by || "created_at";

  const orderQuery = order || 'DESC'

  const fetchQuery = `SELECT a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url, 
      COUNT(c.comment_id)::INT AS comment_count 
      FROM articles a 
      LEFT JOIN comments c ON a.article_id = c.article_id 
      GROUP BY a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url
      ORDER BY ${sortQuery} ${orderQuery}`;
      
  return db.query(fetchQuery)
  .then(({rows: articles})=>{
    return articles
  })
};

const fetchArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles a WHERE a.article_id = $1`, [id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${id}`,
        });
      }
      return article;
    });
};

const updateArticleById = (id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, id]
    )
    .then(({ rows }) => {
      const patchedArticle = rows[0];
      if (!patchedArticle) {
        return Promise.reject({
          status: 404,
          msg: `Article not found`,
        });
      }
      return patchedArticle;
    });
};

module.exports = { fetchArticles, fetchArticleById, updateArticleById };
