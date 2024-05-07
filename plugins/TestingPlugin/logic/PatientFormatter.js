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
const DataAccess_1 = __importDefault(require("../data/DataAccess"));
class PatientFormatter {
    constructor() { }
    getPatientName() {
        return __awaiter(this, void 0, void 0, function* () {
            let patientData = (new DataAccess_1.default()).getPatientData();
            let patient = yield patientData.getPatient();
            let patientName = patient.name[0];
            console.log(patientName.given);
            return patientName.given[0] + " " + patientName.family;
        });
    }
}
exports.default = PatientFormatter;
