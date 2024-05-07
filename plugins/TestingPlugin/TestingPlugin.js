"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractPluginClass_1 = __importDefault(require("../pluginManager/AbstractPluginClass"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const DataAccess_1 = __importDefault(require("./data/DataAccess"));
const PatientFormatter_1 = __importDefault(require("./logic/PatientFormatter"));
class TestingPlugin extends AbstractPluginClass_1.default {
    executeMethod(name, props) {
        if (name === "testMethod") {
            return "This is returned from testMethod";
        }
        if (name === "getPatientInfo") {
            return (new DataAccess_1.default()).getPatientData().getPatient();
        }
        if (name === "getPatientNameString") {
            return (new PatientFormatter_1.default()).getPatientName();
        }
    }
    applyRoutes(app) {
        //Populate relevant routes for the plugin
        app.get("/test", (req, res) => {
            res.send({ text: "this comes from the test plugin" });
        });
        //setting up react page
        app.use(express_1.default.static(path_1.default.join(__dirname, "ui", "testing-plugin-ui", "build")));
        app.get("/test/ui/", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "ui", "testing-plugin-ui", "build", "index.html"));
        });
    }
}
exports.default = TestingPlugin;
