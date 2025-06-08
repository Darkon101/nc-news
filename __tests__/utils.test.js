const comments = require("../db/data/test-data/comments");
const {
  convertTimestampToDate,
  createArticleRef,
  formatComments,
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("createArticleRef", () => {
  it("returns an empty object when given an empty array", () => {
    expect(createArticleRef([], "title", "id")).toEqual({});
  });
  it("should correctly map for one article", () => {
    const article = [{ article_id: 1, title: "A" }];
    const actual = createArticleRef(article, "title", "article_id");
    const expected = { A: 1 };
    expect(actual).toEqual(expected);
  });
  it("should correctly map for multiple articles", () => {
    const articles = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
    ];
    const actual = createArticleRef(articles, "title", "article_id");
    const expected = { A: 1, B: 2 };
    expect(actual).toEqual(expected);
  });
  it("should not mutate original array", () => {
    const article = [{ article_id: 1, title: "A" }];
    const copyArticle = [...article];
    createArticleRef(article, "title", "article_id");
    expect(copyArticle).toEqual(article);
  });
});

describe("formatComments", () => {
  it("returns empty array if passed empty array", () => {
    const testRef = { A: 1 };
    expect(formatComments([], testRef)).toEqual([]);
  });
  it("return array with swapped keys", () => {
    const test = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    const testRef = { "They're not exactly dogs, are they?": 9 };
    expect(formatComments(test, testRef)).toEqual([
      {
        created_at: new Date(1586179020000),
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        article_id: 9,
      },
    ]);
  });
  it('returns a new array', () => {
    const test = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    const testRef = { "They're not exactly dogs, are they?": 9 };
    expect(formatComments(test, testRef)).not.toBe(test);

  });
  it('does not mutate original input ', () => {
    const test = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    const testRef = { "They're not exactly dogs, are they?": 9 };

    const testCopy = JSON.parse(JSON.stringify(test));
    const testReferenceCopy = JSON.parse(JSON.stringify(testRef));

    formatComments(test, testRef)

    expect(testCopy).toEqual(test);
    expect(testCopy[0]).toEqual(test[0]);
    expect(testCopy[0].article_title).toEqual(test[0].article_title);
    expect(testCopy[0].body).toEqual(test[0].body);
    expect(testCopy[0].votes).toEqual(test[0].votes);
    expect(testCopy[0].author).toEqual(test[0].author);

    expect(testReferenceCopy).toEqual(testReferenceCopy);
  });
});
