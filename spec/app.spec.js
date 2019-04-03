process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
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
    });
    describe("/articles", () => {
      describe("/", () => {
        describe("DEFAULT BEHAVIOURS", () => {
          it("GET status:200 returns array of articles", () => {
            return request
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                console.log(body.articles);
                body.articles.forEach(article => {
                  expect(article).to.contain.keys(
                    "author",
                    "title",
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
                  title: 'Living in the shadow of a great man',
                  topic: 'mitch',
                  article_id: 1,
                  author: 'butter_bridge',
                  comment_count: '13',
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes:100,
                })
                expect(body.articles[body.articles.length-1]).to.eql({
                  title: 'Moustache',
                  topic: 'mitch',
                  article_id: 12,
                  author: 'butter_bridge',
                  comment_count: '0',
                  created_at: "1974-11-26T00:00:00.000Z",
                  votes:0,
                })
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
          it("GET status: 200 returns array of articles written on a specific topic", () => {
            return request
              .get("/api/articles?sort_by=title")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[body.articles.length-1]).to.eql({
                  title: 'A',
                  topic: 'mitch',
                  article_id: 6,
                  author: 'icellusedkars',
                  comment_count: '1',
                  created_at: "1998-11-20T00:00:00.000Z",
                  votes:0,
                });
                expect(body.articles[0]).to.eql({
                  title: 'Z',
                  topic: 'mitch',
                  article_id: 7,
                  author: 'icellusedkars',
                  created_at: "1994-11-21T00:00:00.000Z",
                  votes:0,
                  comment_count: '0',
                });
              });
          });
          it("GET status: 200 returns array of articles in a specified order", () => {
            return request
              .get("/api/articles?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.articles[body.articles.length-1]).to.eql({
                  title: 'Living in the shadow of a great man',
                  topic: 'mitch',
                  article_id: 1,
                  author: 'butter_bridge',
                  comment_count: '13',
                  created_at: "2018-11-15T00:00:00.000Z",
                  votes:100,
                });
                expect(body.articles[0]).to.eql({
                  title: 'Moustache',
                  topic: 'mitch',
                  article_id: 12,
                  author: 'butter_bridge',
                  comment_count: '0',
                  created_at: "1974-11-26T00:00:00.000Z",
                  votes:0,
                });
              });
          });
        });
      })
      describe("DEFAULT BEHAVIOURS", () => {
        it("GET status:200 returns a single article object specified by article_id", () => {
          return request
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              console.log(body.article);
              expect(body.article).to.eql({
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                article_id: 1,
                author: 'butter_bridge',
                comment_count: '13',
                created_at: "2018-11-15T00:00:00.000Z",
                votes:100,
              })
            });
        });
      })
    });
  });
});
