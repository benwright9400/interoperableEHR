const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const {
  default: PluginManager,
} = require("./plugins/pluginManager/PluginManager");
const authCheck = require("./src/user_interface/security/authCheck");
const port = 3000;

const pluginManager = new PluginManager(__dirname);
pluginManager.registerPlugin({
  name: "TestingPlugin",
  packageName: "./plugins/TestingPlugin/TestingPlugin",
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// app.use(authCheck)

app.use(
  express.static(
    path.join(__dirname, "src", "user_interface", "default", "build")
  )
);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

//Load plugins
pluginManager.loadPlugin("TestingPlugin").applyRoutes(app);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//for testing purposes
module.exports = { app, server };
