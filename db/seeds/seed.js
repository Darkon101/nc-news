const db = require("../connection");
const format = require("pg-format");
const { createArticleRef } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => db.query(`DROP TABLE IF EXISTS articles;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))
    .then(() => db.query(`DROP TABLE IF EXISTS topics;`))
    .then(() =>
      db.query(`CREATE TABLE topics (
    slug VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    img_url VARCHAR(1000) NOT NULL
  );`)
    )
    .then(() =>
      db.query(`CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(1000) NOT NULL
  );`)
    )
    .then(() =>
      db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(255) REFERENCES topics(slug),
    author VARCHAR(255) REFERENCES users(username),
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000) NOT NULL
  );`)
    )
    .then(() =>
      db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    author VARCHAR(255) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`)
    )
    .then(() => {
      const formattedTopicsData = topicData.map(
        ({ slug, description, img_url }) => [slug, description, img_url]
      );

      const topicsInsertString = format(
        `INSERT INTO topics(slug, description, img_url) VALUES %L;`,
        formattedTopicsData
      );
      return db.query(topicsInsertString);
    })
    .then(() => {
      const formattedUsersData = userData.map(
        ({ username, name, avatar_url }) => [username, name, avatar_url]
      );

      const usersInsertString = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L;`,
        formattedUsersData
      );
      return db.query(usersInsertString);
    })
    .then(() => {
      const formattedArticlesData = articleData.map(
        ({
          title,
          topic,
          author,
          body,
          created_at,
          votes,
          article_img_url,
        }) => [
          title,
          topic,
          author,
          body,
          new Date(created_at),
          votes,
          article_img_url,
        ]
      );

      const articlesInsertString = format(
        `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L`,
        formattedArticlesData
      );

      return db.query(articlesInsertString).then(({ rows: articles }) => {
        const articleReference = createArticleRef(articles)
        const formattedCommentsData = commentData.map(
          ({ article_id, body, votes, author, created_at }) => [
            articleReference[article_id],
            body,
            votes,
            author,
            new Date(created_at),
          ]
        );

        const commentsInsertString = format(`INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L;`, formattedCommentsData)
        return db.query(commentsInsertString)
      });
    });
};
module.exports = seed;

