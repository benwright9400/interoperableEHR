import { model, connect } from 'mongoose';
import { IPatient, PatientSchema } from './Schemas/UserSchema';
import * as dotenv from "dotenv";
import { DocumentSchema } from './Schemas/DocumentSchema';
// dotenv.config({ path: __dirname+'/../../../.env' });

class DatabaseAccess {

    constructor() {
        console.log(process.env.MONGO_DB_URI);
        connect(process.env.MONGO_DB_URI);
    }

    async getOrCreatePatient(fullName: String, dateOfBirth: String, address: String, alternativeIdentifiers) {
        const Patient = model<IPatient>('Patient', PatientSchema);

        //try to find patient with params
        let results = await Patient.find({
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            address: address
        }).exec();

        if(results.length == 1) {
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

        let saveResult = await newPatient.save();

        console.log(saveResult);
        
        return saveResult;

    }

    async listPatients() {
        const Patient = model<IPatient>('Patient', PatientSchema);

        return await Patient.find({}).exec();
    }

    //For testing purposes
    async deletePatient(id) {
        const Patient = model('Patient', PatientSchema);

        return await Patient.findOneAndDelete({patientId: id}).exec();
    }

    async getPatientDocuments(id: String) {
        const Document = model('Document', DocumentSchema);

        return await Document.find({patientId: id}).exec();
    }

    async createPatientDocument(patientId: String, documentDate: String, documentType: String, documentContent) {
        const Document = model('Document', DocumentSchema);

        let newDocument = new Document({
            patientId: patientId,
            documentDate: documentDate,
            documentType: documentType,
            documentContent: documentContent
        });

        let saveResult = await newDocument.save();

        console.log(saveResult);
        
        return saveResult;

    }

}

export default DatabaseAccess;