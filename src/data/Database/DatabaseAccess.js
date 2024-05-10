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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema_1 = require("./Schemas/UserSchema");
const DocumentSchema_1 = require("./Schemas/DocumentSchema");
// dotenv.config({ path: __dirname+'/../../../.env' });
class DatabaseAccess {
    constructor() {
        console.log(process.env.MONGO_DB_URI);
        (0, mongoose_1.connect)(process.env.MONGO_DB_URI);
    }
    getOrCreatePatient(fullName, dateOfBirth, address, alternativeIdentifiers) {
        return __awaiter(this, void 0, void 0, function* () {
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
    listPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            const Patient = (0, mongoose_1.model)('Patient', UserSchema_1.PatientSchema);
            return yield Patient.find({}).exec();
        });
    }
    //For testing purposes
    deletePatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Patient = (0, mongoose_1.model)('Patient', UserSchema_1.PatientSchema);
            return yield Patient.findOneAndDelete({ patientId: id }).exec();
        });
    }
    getPatientDocuments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Document = (0, mongoose_1.model)('Document', DocumentSchema_1.DocumentSchema);
            return yield Document.find({ patientId: id }).exec();
        });
    }
    createPatientDocument(patientId, documentDate, documentType, documentContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const Document = (0, mongoose_1.model)('Document', DocumentSchema_1.DocumentSchema);
            let newDocument = new Document({
                patientId: patientId,
                documentDate: documentDate,
                documentType: documentType,
                documentContent: documentContent
            });
            let saveResult = yield newDocument.save();
            console.log(saveResult);
            return saveResult;
        });
    }
}
exports.default = DatabaseAccess;
