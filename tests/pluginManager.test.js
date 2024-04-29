const request = require("supertest");
// const { app, server } = require("../index");
const path = require("path");
const {
  default: PluginManager,
} = require("../plugins/pluginManager/PluginManager");

const express = require("express");
const app = express();

const pluginManager = new PluginManager(path.join(__dirname, ".."));

//test plugin registry
describe("Test the plugin manager", () => {
  test("It should register the plugin", function (done) {
    expect(pluginManager.listPluginList().get("TestingPlugin")).toBe(undefined);

    pluginManager.registerPlugin({
      name: "TestingPlugin",
      packageName: "./plugins/TestingPlugin/TestingPlugin",
    });

    console.log(pluginManager.listPluginList());
    console.log(pluginManager.listPluginList().get("TestingPlugin"));

    expect(pluginManager.listPluginList().get("TestingPlugin")).toBeDefined();
    done();
  });
});

//test route from plugin
describe("Test test plugin route", () => {
  let server;
  test("It should register the new route from the plugin", function (done) {
    pluginManager.loadPlugin("TestingPlugin").applyRoutes(app);

    server = app.listen(3000, () => {
      console.log("test server is running on port 3000");
    });

    expect(server).toBeDefined();
    done();
  });

  test("It should return a JSON object with the text 'this comes from the test plugin'", function (done) {
    request(app)
      .get("/test")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.text).toEqual("this comes from the test plugin");
        server.close();
        done();
      });
  });
});

//test method from plugin
describe("Test test plugin route", () => {
  test("It should return 'This is returned from testMethod'", function (done) {
    expect(
      pluginManager.loadPlugin("TestingPlugin").executeMethod("testMethod")
    ).toEqual("This is returned from testMethod");

    done();
  });
});
