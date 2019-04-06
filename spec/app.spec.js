process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it("returns a json object of all the available endpoints", () => {
    return request
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).to.contain.keys("GET /api");
      });
  });
  describe("/api", () => {
    describe("/topics", () => {
      describe("DEFAULT BEHAVIOURS", () => {
        it("GET status:200 returns array of topics", () => {
          return request
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              body.topics.forEach(topic => {
                expect(topic).to.contain.keys("slug", "description");
              });
            });
        });
      });
      describe("ERRORS", () => {
        it("INVALID METHOD status: 405 for invalid method", () => {
          return request
            .put("/api/topics")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method Not Allowed");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/", () => {
        describe("DEFAULT BEHAVIOURS", () => {
          it("GET status:200 returns array of articles", () => {
            return request
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                body.articles.forEach(article => {
                  expect(article).to.contain.keys(
                    "author",
                    "title",
                    "body",
                    "article_id",
                    "topic",
                    "created_at",
                    "votes",
                    "comment_count"
                  );
                });
              });
          });
          it("GET status:200 returns array of articles in descending order by created_at", () => {
            return request
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0]).to.eql({
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  article_id: 1,
                  body: "I find this existence challenging",
                  author: "butter_bridge",
                  comment_count: "13",
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes: 100
                });
                expect(body.articles[body.articles.length - 1]).to.eql({
                  title: "Moustache",
                  topic: "mitch",
                  body: "Have you seen the size of that thing?",
                  article_id: 12,
                  author: "butter_bridge",
                  comment_count: "0",
                  created_at: "1974-11-26T00:00:00.000Z",
                  votes: 0
                });
              });
          });
        });
        describe("QUERIES", () => {
          it("GET status: 200 returns array of articles written by specific author", () => {
            return request
              .get("/api/articles?articles.author=icellusedkars")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles.length).to.equal(6);
              });
          });
          it("GET status: 200 returns array of articles written on a specific topic", () => {
            return request
              .get("/api/articles?topic=mitch")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles.length).to.equal(11);
              });
          });
          it("GET status: 200 returns array of articles sorted by a specified category", () => {
            return request
              .get("/api/articles?sort_by=title")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[body.articles.length - 1]).to.eql({
                  title: "A",
                  topic: "mitch",
                  body: "Delicious tin of cat food",
                  article_id: 6,
                  author: "icellusedkars",
                  comment_count: "1",
                  created_at: "1998-11-20T00:00:00.000Z",
                  votes: 0
                });
                expect(body.articles[0]).to.eql({
                  title: "Z",
                  topic: "mitch",
                  body: "I was hungry.",
                  article_id: 7,
                  author: "icellusedkars",
                  created_at: "1994-11-21T00:00:00.000Z",
                  votes: 0,
                  comment_count: "0"
                });
              });
          });
          it("GET status: 200 returns array of articles sorted by created_at when asked to sort_by an invalid query", () => {
            return request
              .get("/api/articles?sort_by=snakes")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[0]).to.eql({
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  article_id: 1,
                  body: "I find this existence challenging",
                  author: "butter_bridge",
                  comment_count: "13",
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes: 100
                });
                expect(body.articles[body.articles.length - 1]).to.eql({
                  title: "Moustache",
                  topic: "mitch",
                  body: "Have you seen the size of that thing?",
                  article_id: 12,
                  author: "butter_bridge",
                  comment_count: "0",
                  created_at: "1974-11-26T00:00:00.000Z",
                  votes: 0
                });
              });
          });
          it("GET status: 200 returns array of articles in a specified order", () => {
            return request
              .get("/api/articles?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[body.articles.length - 1]).to.eql({
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  article_id: 1,
                  body: "I find this existence challenging",
                  author: "butter_bridge",
                  comment_count: "13",
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes: 100
                });
                expect(body.articles[0]).to.eql({
                  title: "Moustache",
                  topic: "mitch",
                  article_id: 12,
                  body: "Have you seen the size of that thing?",
                  author: "butter_bridge",
                  comment_count: "0",
                  created_at: "1974-11-26T00:00:00.000Z",
                  votes: 0
                });
              });
          });
        });
        describe("ERRORS", () => {
          it("GET status:400 for invalid query", () => {
            return request
              .get("/api/articles?Snake=5")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("INVALID METHOD status: 405 for invalid method", () => {
            return request
              .put("/api/articles")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal("Method Not Allowed");
              });
          });
        });
      });
      describe("/:article_id", () => {
        describe("DEFAULT BEHAVIOURS", () => {
          it("GET status:200 returns a single article object specified by article_id", () => {
            return request
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body.article).to.eql({
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  body: "I find this existence challenging",
                  article_id: 1,
                  author: "butter_bridge",
                  comment_count: "13",
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes: 100
                });
              });
          });
          it("PATCH status:200 returns a single article object with a new vote value", () => {
            const input = { inc_votes: 1 };
            return request
              .patch("/api/articles/1")
              .send(input)
              .expect(200)
              .then(({ body }) => {
                expect(body.article).to.eql({
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  article_id: 1,
                  author: "butter_bridge",
                  body: "I find this existence challenging",
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes: 101
                });
              });
          });
          it("PATCH status:200 returns a single article object unmodified if given an empty body", () => {
            const input = { };
            return request
              .patch("/api/articles/1")
              .send(input)
              .expect(200)
              .then(({ body }) => {
                expect(body.article).to.eql({
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  article_id: 1,
                  author: "butter_bridge",
                  body: "I find this existence challenging",
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes: 100
                });
              });
          });
          it("DELETE status:204 removes an article and returns non content", () => {
            return request.delete("/api/articles/1").expect(204);
          });
        });
        describe("ERRORS", () => {
          it("GET status:404 for non-existent article_id", () => {
            return request
              .get("/api/articles/200000")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Value Not Found");
              });
          });
          it("PATCH status:404 for non-existent article_id", () => {
            const input = { inc_votes: 1 };
            return request
              .patch("/api/articles/200000")
              .send(input)
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Value Not Found");
              });
          });
          it("DELETE status:404 for non-existent article_id", () => {
            return request
              .delete("/api/articles/200000")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Value Not Found");
              });
          });
          it("GET status:400 for invalid article_id", () => {
            return request
              .get("/api/articles/Frank")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("PATCH status:400 for invalid article_id", () => {
            const input = { inc_votes: 1 };
            return request
              .patch("/api/articles/Frank")
              .send(input)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("PATCH status:400 for invalid article_id", () => {
            const input = { inc_votes: 'Frank' };
            return request
              .patch("/api/articles/1")
              .send(input)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("DELETE status:400 for invalid article_id", () => {
            return request
              .delete("/api/articles/Frank")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("INVALID METHOD status: 405 for invalid method", () => {
            return request
              .put("/api/articles/1")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal("Method Not Allowed");
              });
          });
        });
        describe("/comments", () => {
          describe("DEFAULT BEHAVIOURS", () => {
            it("GET status:200 returns an array of comments from a specified article", () => {
              return request
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments.length).to.eql(13);
                  body.comments.forEach(comment => {
                    expect(comment).to.contain.keys(
                      "comment_id",
                      "votes",
                      "created_at",
                      "author",
                      "body"
                    );
                  });
                });
            });
            it("POST status:201 returns a new comment that has been added to a specified article", () => {
              input = {
                author: "butter_bridge",
                body: "This is a fake comment"
              };
              return request
                .post("/api/articles/1/comments")
                .send(input)
                .expect(201)
                .then(({ body }) => {
                  expect(body.comment).to.eql({
                    article_id: 1,
                    author: "butter_bridge",
                    body: "This is a fake comment",
                    comment_id: 19,
                    created_at: "2019-04-05T23:00:00.000Z",
                    votes: 0
                  });
                });
            });
          });
          describe("QUERIES", () => {
            it("GET status: 200 returns array of comments sorted by a specified category", () => {
              return request
                .get("/api/articles/1/comments?sort_by=comment_id")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[body.comments.length - 1]).to.eql({
                    comment_id: 2,
                    votes: 14,
                    created_at: "2016-11-22T00:00:00.000Z",
                    body:
                      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
                    author: "butter_bridge"
                  });
                  expect(body.comments[0]).to.eql({
                    comment_id: 18,
                    votes: 16,
                    created_at: "2000-11-26T00:00:00.000Z",
                    body: "This morning, I showered for nine minutes.",
                    author: "butter_bridge"
                  });
                });
            });
            it("GET status: 200 returns array of comments sorted by created_at if given invalid sort-by query", () => {
              return request
                .get("/api/articles/1/comments?sort_by=snake")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[body.comments.length - 1]).to.eql({
                    comment_id: 18,
                    votes: 16,
                    created_at: "2000-11-26T00:00:00.000Z",
                    body: "This morning, I showered for nine minutes.",
                    author: "butter_bridge"
                  });
                  expect(body.comments[0]).to.eql({
                    comment_id: 2,
                    votes: 14,
                    created_at: "2016-11-22T00:00:00.000Z",
                    body:
                      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
                    author: "butter_bridge"
                  });
                });
            });
            it("GET status: 200 returns array of comments in a specified order", () => {
              return request
                .get("/api/articles/1/comments?order=asc")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments[body.comments.length - 1]).to.eql({
                    comment_id: 2,
                    votes: 14,
                    created_at: "2016-11-22T00:00:00.000Z",
                    body:
                      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
                    author: "butter_bridge"
                  });
                  expect(body.comments[0]).to.eql({
                    comment_id: 18,
                    votes: 16,
                    created_at: "2000-11-26T00:00:00.000Z",
                    body: "This morning, I showered for nine minutes.",
                    author: "butter_bridge"
                  });
                });
            });
          });
          describe("ERRORS", () => {
            it("GET status:400 for invalid article_id", () => {
              return request
                .get("/api/articles/Frank/comments")
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.equal("Invalid Value");
                });
            });
            it("GET status:404 for non-existent article_id", () => {
              return request
                .get("/api/articles/200000/comments")
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).to.equal("Value Not Found");
                });
            });
            it("POST status:400 for invalid article_id", () => {
              input = {
                author: "butter_bridge",
                body: "This is a fake comment"
              };
              return request
                .post("/api/articles/Frank/comments")
                .send(input)
                .expect(400)
                .then(({ body }) => {
                  expect(body.msg).to.equal("Invalid Value");
                });
            });
            it("POST status:404 for non-existent article_id", () => {
              input = {
                author: "butter_bridge",
                body: "This is a fake comment"
              };
              return request
                .post("/api/articles/20000/comments")
                .send(input)
                .expect(404)
                .then(({ body }) => {
                  expect(body.msg).to.equal("Value Not Found");
                });
            });
            it("INVALID METHOD status: 405 for invalid method", () => {
              return request
                .put("/api/articles/1/comments")
                .expect(405)
                .then(({ body }) => {
                  expect(body.msg).to.equal("Method Not Allowed");
                });
            });
            it("POST status:422 for nonexistent username", () => {
              input = {
                author: "Frank",
                body: "This is yet another fake comment"
              };
              return request
                .post("/api/articles/1/comments")
                .send(input)
                .expect(422)
                .then(({ body }) => {
                  expect(body.msg).to.eql("Unprocessable Entity");
                });
            });
          });
        });
      });
    });
    describe("/comments", () => {
      describe("/:comment_id", () => {
        describe("DEFAULT BEHAVIOURS", () => {
          it("PATCH status:200 returns a single comment object with a new vote value", () => {
            const input = { inc_votes: 11 };
            return request
              .patch("/api/comments/1")
              .send(input)
              .expect(200)
              .then(({ body }) => {
                expect(body.comment).to.eql({
                  comment_id: 1,
                  author: "butter_bridge",
                  article_id: 9,
                  votes: 27,
                  body:
                    "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                  created_at: "2017-11-22T00:00:00.000Z"
                });
              });
          });
          it("DELETE status:204 removes a comment and returns no content", () => {
            return request.delete("/api/comments/1").expect(204);
          });
        });
        describe("ERRORS", () => {
          it("PATCH status:404 for non-existent comment_id", () => {
            const input = { inc_votes: 1 };
            return request
              .patch("/api/comments/200000")
              .send(input)
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Value Not Found");
              });
          });
          it("DELETE status:404 for non-existent comment_id", () => {
            return request
              .delete("/api/comments/200000")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Value Not Found");
              });
          });
          it("PATCH status:400 for invalid article_id", () => {
            const input = { inc_votes: 1 };
            return request
              .patch("/api/comments/Frank")
              .send(input)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("DELETE status:400 for invalid article_id", () => {
            return request
              .delete("/api/comments/Frank")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Invalid Value");
              });
          });
          it("INVALID METHOD status: 405 for invalid method", () => {
            return request
              .put("/api/comments/1")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal("Method Not Allowed");
              });
          });
        });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        describe("DEFAULT BEHAVIOURS", () => {
          it("GET status:200 returns a single user object specified by username", () => {
            return request
              .get("/api/users/icellusedkars")
              .expect(200)
              .then(({ body }) => {
                expect(body.user).to.eql({
                  username: "icellusedkars",
                  avatar_url:
                    "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
                  name: "sam"
                });
              });
          });
        });
        describe("ERRORS", () => {
          it("GET status:404 for non-existent username", () => {
            return request
              .get("/api/users/200000")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Value Not Found");
              });
          });
          it("INVALID METHOD status: 405 for invalid method", () => {
            return request
              .put("/api/users/1")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal("Method Not Allowed");
              });
          });
        });
      });
    });
  });
});
describe("/*", () => {
  it("GET status:404 for invalid path request", () => {
    return request
      .get("/newspapers")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal("Route Not Found");
      });
  });
});
