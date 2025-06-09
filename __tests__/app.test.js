const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object with an array containing all topic objects, with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).not.toBe(0);
        body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an object with an array containing all article objects, in descending order by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).not.toBe(0);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
          expect(article).not.toHaveProperty("body");
        });
      });
  });
  test('200: Responds with sorted articles when sort_by query is present', () => {
    return request(app)
    .get('/api/articles?sort_by=article_id')
    .expect(200)
    .then(({body})=>{
      expect(body.articles.length).not.toBe(0)
      expect(body.articles).toBeSortedBy('article_id', {descending: true})
    })
  });
  test('200: Responds with ordered articles when order query is present', () => {
    return request(app)
    .get('/api/articles?order=ASC')
    .expect(200)
    .then(({body})=>{
      expect(body.articles.length).not.toBe(0)
      expect(body.articles).toBeSortedBy('created_at', {ascending: true})
    })
  });
  test("400: Bad Request -- sort column that doesn't exist", () => {
    return request(app)
    .get('/api/articles?sort_by=test')
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe('Invalid input');
    })
  });
  test("400: Bad Request -- order must be asc/desc", () => {
    return request(app)
    .get('/api/articles?order=test')
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe('Invalid input');
    })
  });
  test('200: Responds with filtered articles if topic query', () => {
    return request(app)
    .get('/api/articles?topic=mitch')
    .expect(200)
    .then(({body})=>{
      expect(body.articles.length).not.toBe(0);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
        body.articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(article.topic).toBe("mitch");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
          expect(article).not.toHaveProperty("body");
        });
    })
  });
  test('404: Topic not in database', () => {
    return request(app)
    .get('/api/articles?topic=testtopic')
    .expect(404)
    .then(({body})=>{
      expect(body.msg).toBe("Topic not found");
    })
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an object with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).not.toBe(0);
        body.users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an object of a single article based on article_id", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body: article }) => {
        const {
          author,
          title,
          article_id,
          body,
          topic,
          created_at,
          votes,
          article_img_url,
          comment_count
        } = article.article;

        expect(typeof author).toBe("string");
        expect(typeof title).toBe("string");
        expect(typeof article_id).toBe("number");
        expect(typeof body).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(typeof votes).toBe("number");
        expect(typeof article_img_url).toBe("string");
        expect(typeof comment_count).toBe('number')
      });
  });
  test("404: Article not present within database", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id: 99");
      });
  });
  test("400: Bad request", () => {
    return request(app)
      .get("/api/articles/dog")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Returns with all comments belonging to single article id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
        expect(body.comments.length).not.toBe(0);
        body.comments.forEach((comment) => {
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.comment_id).toBe("number");
        });
      });
  });
  test("404: Returns error when article_id not in data base", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id: 99");
      });
  });
  test("400: Bad request", () => {
    return request(app)
      .get("/api/articles/dog/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "icellusedkars",
        body: "testBody",
      })
      .expect(201)
      .then(({ body: test }) => {
        const { comment_id, article_id, body, votes, author, created_at } =
          test.postedComment;
        expect(typeof comment_id).toBe("number");
        expect(typeof article_id).toBe("number");
        expect(body).toBe("testBody");
        expect(typeof votes).toBe("number");
        expect(author).toBe("icellusedkars");
        expect(typeof created_at).toBe("string");
      });
  });
  test("400: Bad Request -- article_id not a number", () => {
    return request(app)
      .post("/api/articles/test/comments")
      .send({
        username: "icellusedkars",
        body: "testBody",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("400: Bad Request -- items missing in body", () => {
    return request(app)
      .post("/api/articles/3/comments")
      .send({
        username: "icellusedkars",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: Article not found in database", () => {
    return request(app)
      .post("/api/articles/999/comments")
      .send({ username: "icellusedkars", body: "testBody" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Responds with updates PATCHed article object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 })
      .expect(200)
      .then(({ body }) => {
        const {
          article_id,
          title,
          topic,
          author,
          created_at,
          votes,
          article_img_url,
        } = body.patchedArticle;
        expect(article_id).toBe(1);
        expect(typeof title).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof author).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(typeof votes).toBe("number");
        expect(votes).toBe(200);
        expect(typeof article_img_url).toBe("string");
      });
  });
  test("400: Bad request -- invalid article_id", () => {
    return request(app)
      .patch("/api/articles/test")
      .send({ inc_votes: 100 })
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("400: Bad request -- invalid inc_votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 'test' })
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("404: article_id not in database", () => {
    return request(app)
      .patch("/api/articles/999")
      .send({ inc_votes: 100 })
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  
});

describe('DELETE /api/comments/:comment_id', () => {
  test('204: DELETES comment based on id -- returns empty object', () => {
    return request(app)
    .delete('/api/comments/1')
    .expect(204)
    .then(({body})=>{
      expect(body.deletedComment).toBeUndefined()
    })
  });
  test('404: comment _id not in database', () => {
    return request(app)
    .delete('/api/comments/999')
    .expect(404)
    .then(({body})=>{
      expect(body.msg).toBe('Comment not found')
    })
  });
  test('400: bad request -- invalid comment_id', () => {
    return request(app)
    .delete('/api/comments/test')
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe('Invalid input')
    })
  });
});
