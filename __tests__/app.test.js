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

describe("GET /api/topics", ()=>{
  test("200: Responds with an object with an array containing all topic objects, with slug and description properties", ()=>{
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body})=>{
      expect(body.topics.length).not.toBe(0)
      body.topics.forEach((topic)=>{
        expect(typeof topic.slug).toBe('string')
        expect(typeof topic.description).toBe('string')
      })
    })
  })
})

describe('GET /api/articles', () => {
  test('200: Responds with an object with an array containing all article objects, in descending order by date', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body})=>{
      expect(body.articles.length).not.toBe(0)
      expect(body.articles).toBeSortedBy('created_at', {descending: true})
      body.articles.forEach((article)=>{
        expect(typeof article.author).toBe('string')
        expect(typeof article.title).toBe('string')
        expect(typeof article.article_id).toBe('number')
        expect(typeof article.topic).toBe('string')
        expect(typeof article.created_at).toBe('string')
        expect(typeof article.votes).toBe('number')
        expect(typeof article.article_img_url).toBe('string')
        expect(typeof article.comment_count).toBe('number')
        expect(article).not.toHaveProperty('body')
      })
    })
  });
});

describe('GET /api/users', () => {
  test('200: Responds with an object with an array of user objects', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body})=>{
      expect(body.users.length).not.toBe(0)
      body.users.forEach((user)=>{
        expect(typeof user.username).toBe('string')
        expect(typeof user.name).toBe('string')
        expect(typeof user.avatar_url).toBe('string')
      })
    })
  });
});
