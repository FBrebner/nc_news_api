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
              body.topics.forEach((topic) => {
                expect(topic).to.contain.keys(
                  'slug',
                  'description',
                )
              })
            });
        });
      });
    });
  });
});
