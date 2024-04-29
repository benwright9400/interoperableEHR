"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const require_module_1 = __importDefault(require("require-module"));
class PluginManager {
    constructor(path) {
        this.pluginList = new Map();
        this.path = path;
    }
    hasPlugin(name) {
        return this.pluginList.has(name);
    }
    addPlugin(plugin, packageContents) {
        this.pluginList.set(plugin.name, Object.assign(Object.assign({}, plugin), { instance: packageContents }));
    }
    containsNameAndPackageName(plugin) {
        return !plugin.name || !plugin.packageName;
    }
    registerPlugin(plugin) {
        if (this.containsNameAndPackageName(plugin)) {
            throw new Error("The plugin name and package name are required to continue");
        }
        //checks if plugin already exsists
        if (this.hasPlugin(plugin.name)) {
            throw new Error(`Cannot add existing plugin ${plugin.name}`);
        }
        try {
            const packageContents = (0, require_module_1.default)(path_1.default.join(this.path, plugin.packageName));
            this.addPlugin(plugin, packageContents);
        }
        catch (error) {
            console.log(`Cannot load plugin ${plugin.name}`, error);
        }
    }
    loadPlugin(name) {
        const retreivedPlugin = this.pluginList.get(name);
        if (!retreivedPlugin) {
            throw new Error(`cannot find plugin ${name}`);
        }
        return Object.create(retreivedPlugin === null || retreivedPlugin === void 0 ? void 0 : retreivedPlugin.instance.default.prototype);
    }
    listPluginList() {
        return this.pluginList;
    }
}
exports.default = PluginManager;
