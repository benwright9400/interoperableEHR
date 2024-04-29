"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractPluginClass_1 = __importDefault(require("../pluginManager/AbstractPluginClass"));
class TestingPlugin extends AbstractPluginClass_1.default {
    executeMethod(name, props) {
        if (name === "testMethod") {
            return "This is returned from testMethod";
        }
    }
    applyRoutes(app) {
        //Populate relevant routes for the plugin
        app.get("/test", (req, res) => {
            res.send({ text: "this comes from the test plugin" });
        });
    }
}
exports.default = TestingPlugin;
