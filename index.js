const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {
  default: PluginManager,
} = require("./plugins/pluginManager/PluginManager");
const port = 3000;

const pluginManager = new PluginManager(__dirname);
pluginManager.registerPlugin({
  name: "TestingPlugin",
  packageName: "./plugins/TestingPlugin/TestingPlugin",
});

app.get("/", (req, res) => {
  console.log("/ called");
  res.send({ text: "Hello World!" });
});

//Load plugins
pluginManager.loadPlugin("TestingPlugin").applyRoutes(app);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//for testing purposes
module.exports = { app, server};
