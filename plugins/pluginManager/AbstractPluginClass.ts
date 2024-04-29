abstract class AbstractPlugin {
  abstract executeMethod(name: string, props: any): any;

  abstract applyRoutes(app: any): any;
}

export default AbstractPlugin;
