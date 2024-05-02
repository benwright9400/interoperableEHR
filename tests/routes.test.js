const request = require("supertest");
const { app, server} = require("../index");

describe("Test the root path", () => {
  test("It should return the correct body method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        console.log(response.headers);
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toEqual("text/html; charset=UTF-8");
        done();
      });
  });
});
