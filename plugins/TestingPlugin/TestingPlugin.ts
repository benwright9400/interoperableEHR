import AbstractPlugin from "../pluginManager/AbstractPluginClass";

class TestingPlugin extends AbstractPlugin {
  executeMethod(name: any, props: any) {
    if (name === "testMethod") {
      return "This is returned from testMethod";
    }
  }

  applyRoutes(app: any) {
    //Populate relevant routes for the plugin
    app.get("/test", (req: any, res: any) => {
      res.send({ text: "this comes from the test plugin" });
    });
  }
}

export default TestingPlugin;
