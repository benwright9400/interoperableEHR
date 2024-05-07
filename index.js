const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const {
  default: PluginManager,
} = require("./plugins/pluginManager/PluginManager");
const authCheck = require("./src/user_interface/security/authCheck");
const { default: RulesParser } = require("./plugins/pluginManager/RulesParser");
const bodyParser = require("body-parser");
const port = 3000;

//register relevent plugins
const pluginManager = new PluginManager(__dirname);
pluginManager.registerPlugin({
  name: "TestingPlugin",
  packageName: "./plugins/TestingPlugin/TestingPlugin",
});

//handle cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//setup default route
app.use(
  express.static(
    path.join(__dirname, "src", "user_interface", "default", "build")
  )
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "user_interface", "default", "build", "index.html")
  );
});

app.post("/render/rules", (req, res) => {
  console.log(req.body);
  let route = (new RulesParser()).getRoute(req.body.subject, req.body)
  res.send({route: route});
});

//auth checks are only used in a production environment
if (process.env.ENV_TYPE != "TESTING") {
  app.use(authCheck);
}

//Load plugins
pluginManager.loadPlugin("TestingPlugin").applyRoutes(app);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//exported for testing purposes
module.exports = { app, server };
