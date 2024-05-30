const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const {
  default: PluginManager,
} = require("./plugins/pluginManager/PluginManager");
const { default: PatientsHandler } = require("./src/logic/PatientsHandler");
const { default: DocumentsHandler } = require("./src/logic/DocumentsHandler");
const authCheck = require("./src/user_interface/security/authCheck");
const { default: RulesParser } = require("./plugins/pluginManager/RulesParser");
const bodyParser = require("body-parser");
const {
  default: AbstractPlugin,
} = require("./plugins/pluginManager/AbstractPluginClass");
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
app.use(bodyParser.urlencoded({ extended: false }));

//setup default route
app.use(
  express.static(
    path.join(__dirname, "src", "user_interface", "default", "build")
  )
);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "src",
      "user_interface",
      "default",
      "build",
      "index.html"
    )
  );
});

app.post("/render/rules", (req, res) => {
  console.log(req.body);
  let route = new RulesParser().getRoute(req.body.subject, req.body);
  res.send({ route: route });
});

app.get("/api/patients", (req, res) => {
  let patientsHandler = new PatientsHandler();

  patientsHandler.getAllPatients().then((patients) => {
    res.send(patients);
  });
});

app.post("/api/document", (req, res) => {
  console.log(req.body);

  let documentsHandler = new DocumentsHandler();

  documentsHandler.getPatientDocuments(req.body.id).then((results) => {
    res.send(results);
  });
});

app.post("/api/document/update", (req, res) => {
  console.log(req.body);

  let documentsHandler = new DocumentsHandler();

  documentsHandler.updateDocument(req.body.id, req.body).then((results) => {
    res.send(results);
  });
});

app.post("/api/document/create", (req, res) => {
  console.log(req.body);

  let documentsHandler = new DocumentsHandler();

  documentsHandler.createDocument(req.body).then((results) => {
    res.send(results);
  });
});

app.get("/api/plugins", (req, res) => {
  console.log(req.body);

  let list = [];

  pluginManager.listPluginList().forEach((val, key, map) => {
    list.push(key);
  });

  console.log(list);

  res.send(list);
});

app.post("/api/patients/external", (req, res) => {
  console.log(req.body);

  //remove plugin name so request parameters are correct
  let patientQueryInfo = { ...req.body };
  delete patientQueryInfo.plugin;

  console.log(pluginManager.loadPlugin(req.body.plugin));

  pluginManager
    .loadPlugin(req.body.plugin)
    .executeMethod("queryPatients", patientQueryInfo)
    .then((patientsList) => {
      console.log(patientsList);
      res.send(patientsList);
    });
});

app.post("/api/patients/external/healthdata", async (req, res) => {
  console.log(req.body);

  //remove plugin name so request parameters are correct
  let patientQueryInfo = { ...req.body };
  delete patientQueryInfo.plugin;

  console.log(pluginManager.loadPlugin(req.body.plugin));

  //create patient using ID
  let patientsHandler = new PatientsHandler();
  let documentsHandler = new DocumentsHandler();

  let patientInfo = await pluginManager
    .loadPlugin(req.body.plugin)
    .executeMethod("getPatientInfo", patientQueryInfo.id);

  console.log(patientInfo);

  console.log(patientInfo.name);

  let patientAddress = "";

  if ("line" in patientInfo.address[0]) {
    patientAddress =
      patientInfo.address[0].line[0] + ", " + patientInfo.address[0].country;
  } else if ("city" in patientInfo.address[0]) {
    patientAddress = patientInfo.address[0].city;
  }

  let newPatientInput = {
    fullName: req.body.name,
    dateOfBirth: patientInfo.birthDate,
    address: patientAddress,
    patientId: patientInfo.id,
    alternativeIdentifiers: [
      {
        identifier: req.body.plugin,
        value: patientQueryInfo.id,
      },
    ],
  };

  let createdPatient = await patientsHandler.createPatient(newPatientInput);

  console.log(createdPatient);

  await documentsHandler.createDocument({
    patientId: createdPatient._id,
    documentDate: new Date().toISOString(),
    documentType: "Patient",
    documentContent: patientInfo,
  });

  console.log(patientInfo);

  let patientsList = await pluginManager
    .loadPlugin(req.body.plugin)
    .executeMethod("getHealthData", patientQueryInfo.id);

    console.log("result from healthdata query");
  console.log(patientsList);
  console.log(patientsList.length);

  //convert data to documents
  patientsList.forEach(async (patientsItem) => {
    console.log(patientsItem);

    if ("issue" in patientsItem) {
      console.log("issue is in item");
      return;
    } else {
      if ("date" in patientsItem.resource) {
        await documentsHandler.createDocument({
          patientId: createdPatient._id,
          documentDate: patientsItem.resource.date,
          documentType: patientsItem.resource.resourceType,
          documentContent: patientsItem,
        });
      }

      if("created" in patientsItem.resource) {
        await documentsHandler.createDocument({
          patientId: createdPatient._id,
          documentDate: patientsItem.resource.created,
          documentType: patientsItem.resource.resourceType,
          documentContent: patientsItem,
        });
      }

      if("recordedDate" in patientsItem.resource) {
        await documentsHandler.createDocument({
          patientId: createdPatient._id,
          documentDate: patientsItem.resource.recordedDate,
          documentType: patientsItem.resource.resourceType,
          documentContent: patientsItem,
        });
      }

      if("issued" in patientsItem.resource) {
        await documentsHandler.createDocument({
          patientId: createdPatient._id,
          documentDate: patientsItem.resource.issued,
          documentType: patientsItem.resource.resourceType,
          documentContent: patientsItem,
        });
      }
    }
  });

  res.send(patientsList);
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
