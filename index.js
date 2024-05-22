const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const {
  default: PluginManager,
} = require("./plugins/pluginManager/PluginManager");
const { default: PatientsHandler } = require("./src/logic/PatientsHandler");
const { default: DocumentsHandler } = require("./src/logic/DocumentsHandler")
const authCheck = require("./src/user_interface/security/authCheck");
const { default: RulesParser } = require("./plugins/pluginManager/RulesParser");
const bodyParser = require("body-parser");
const port = 3055;

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
app.use(bodyParser.urlencoded({ extended: false }))

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
  res.send({ route: route });
});

app.get("/api/patients", (req, res) => {
  let patientsHandler = new PatientsHandler();

  patientsHandler.getAllPatients().then((patients) => {
    res.send(patients);
  });
});

app.post("/api/document", (req, res) => {
  console.log(req.body)

  let documentsHandler = new DocumentsHandler();

  documentsHandler.getPatientDocuments(req.body.id).then((results) => {
    res.send(results);
  });
});

app.post("/api/document/update", (req, res) => {
  console.log(req.body)

  let documentsHandler = new DocumentsHandler();

  documentsHandler.updateDocument(req.body.id, req.body).then((results) => {
    res.send(results);
  });
});

app.post("/api/document/create", (req, res) => {
  console.log(req.body)

  let documentsHandler = new DocumentsHandler();

  documentsHandler.createDocument(req.body.id, req.body).then((results) => {
    res.send(results);
  });
});

app.get("/api/plugins", (req, res) => {
  console.log(req.body)

  let list = [];

  let plugins = pluginManager.listPluginList().forEach((val, key, map) => {
    list.push(key);
  });

  console.log(list);

  res.send(list);
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
