import AbstractPlugin from "../pluginManager/AbstractPluginClass";
import path from "path";
import express from "express";
import DataAccess from "./data/DataAccess";
import PatientFormatter from "./logic/PatientFormatter";

class TestingPlugin extends AbstractPlugin {
  executeMethod(name: any, props: any) {
    if (name === "testMethod") {
      return "This is returned from testMethod";
    }

    if (name === "getPatientInfo") {
      return (new DataAccess()).getPatientData().getPatient();
    }

    if(name === "getPatientNameString") {
      return (new PatientFormatter()).getPatientName();
    }
  }

  applyRoutes(app: any) {
    //Populate relevant routes for the plugin
    app.get("/test", (req: any, res: any) => {
      res.send({ text: "this comes from the test plugin" });
    });

    //setting up react page
    app.use(
      express.static(path.join(__dirname, "ui", "testing-plugin-ui", "build"))
    );

    app.get("/test/ui/", (req: any, res: any) => {
      res.sendFile(
        path.join(__dirname, "ui", "testing-plugin-ui", "build", "index.html")
      );
    });
  }
}

export default TestingPlugin;
