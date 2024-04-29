import path from "path";
import requireModule from "require-module";
import PluginInterface from "./PluginInterface";

class PluginManager {
    private pluginList: Map<string, PluginInterface>;
    private path: string;
  
    constructor(path: string) {
      this.pluginList = new Map();
      this.path = path;
    }
  
    hasPlugin(name: string): boolean {
      return this.pluginList.has(name);
    }
  
    private addPlugin(plugin: PluginInterface, packageContents: any): void {
      this.pluginList.set(plugin.name, { ...plugin, instance: packageContents });
    }
  
    private containsNameAndPackageName(plugin: PluginInterface): boolean {
      return !plugin.name || !plugin.packageName;
    }
  
    registerPlugin(plugin: PluginInterface): void {
      if (this.containsNameAndPackageName(plugin)) {
        throw new Error(
          "The plugin name and package name are required to continue"
        );
      }
  
      //checks if plugin already exsists
      if (this.hasPlugin(plugin.name)) {
        throw new Error(`Cannot add existing plugin ${plugin.name}`);
      }
  
      try {
        const packageContents = requireModule(
          path.join(this.path, plugin.packageName)
        );
        this.addPlugin(plugin, packageContents);
      } catch (error) {
        console.log(`Cannot load plugin ${plugin.name}`, error);
      }
    }
  
    loadPlugin<T>(name: string): T {
      const retreivedPlugin = this.pluginList.get(name);
  
      if (!retreivedPlugin) {
        throw new Error(`cannot find plugin ${name}`);
      }
  
      return Object.create(retreivedPlugin?.instance.default.prototype) as T;
    }
  
    listPluginList(): Map<string, PluginInterface> {
      return this.pluginList;
    }
  }
  
  export default PluginManager;