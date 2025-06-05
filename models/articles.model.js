const db = require("../db/connection");

const fetchArticles = () => {
  return db
    .query(
      `SELECT a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url, 
      COUNT(c.comment_id)::INT AS comment_count 
      FROM articles a 
      LEFT JOIN comments c ON a.article_id = c.article_id 
      GROUP BY a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url
      ORDER BY a.created_at DESC`
    )
    .then(({ rows: articles }) => {
      return articles;
    });
};

const fetchArticleById = (id) => {
  return db.query(`SELECT * FROM articles a WHERE a.article_id = $1`, [id]).then(({rows})=>{
    const article =  rows[0]
    if(!article){
      return Promise.reject({
        status: 404,
        msg: `No article found for article_id: ${id}`
      })
    }
    return article
  })
}

module.exports = { fetchArticles, fetchArticleById };
