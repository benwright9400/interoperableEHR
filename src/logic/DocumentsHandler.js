"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseAccess_1 = __importDefault(require("../data/Database/DatabaseAccess"));
class DocumentsHandler {
    getPatientDocuments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let databaseAccess = new DatabaseAccess_1.default();
            return yield databaseAccess.getPatientDocuments(id);
        });
    }
    updateDocument(id, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let databaseAccess = new DatabaseAccess_1.default();
            return yield databaseAccess.updatePatientDocument(id, newValue);
        });
    }
    createDocument(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let databaseAccess = new DatabaseAccess_1.default();
            return yield databaseAccess.createPatientDocument(newValue);
        });
    }
}
exports.default = DocumentsHandler;
