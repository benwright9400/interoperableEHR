"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema_1 = require("./Schemas/UserSchema");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/../../../.env' });
class DatabaseAccess {
    constructor() {
    }
    getOrCreatePatient(fullName, dateOfBirth, address, alternativeIdentifiers) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, mongoose_1.connect)(process.env.MONGO_DB_URI);
            const Patient = (0, mongoose_1.model)('Patient', UserSchema_1.PatientSchema);
            //try to find patient with params
            let results = yield Patient.find({
                fullName: fullName,
                dateOfBirth: dateOfBirth,
                address: address
            }).exec();
            if (results.length == 1) {
                console.log(results[0]);
                return results[0];
            }
            //else create new patient
            let newPatient = new Patient({
                fullName: fullName,
                dateOfBirth: dateOfBirth,
                address: address,
                alternativeIdentifiers: alternativeIdentifiers
            });
            let saveResult = yield newPatient.save();
            console.log(saveResult);
            return saveResult;
        });
    }
    //For testing purposes
    deletePatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, mongoose_1.connect)(process.env.MONGO_DB_URI);
            const Patient = (0, mongoose_1.model)('Patient', UserSchema_1.PatientSchema);
            return yield Patient.findOneAndDelete(id).exec();
        });
    }
    getPatientDocuments() {
    }
    createPatientDocument() {
    }
}
exports.default = DatabaseAccess;
