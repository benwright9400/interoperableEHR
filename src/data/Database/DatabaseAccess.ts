import { model, connect } from 'mongoose';
import { IPatient, PatientSchema } from './Schemas/UserSchema';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../../../.env' });

class DatabaseAccess {

    constructor() {

    }

    async getOrCreatePatient(fullName: String, dateOfBirth: String, address: String, alternativeIdentifiers) {
        connect(process.env.MONGO_DB_URI);

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

    //For testing purposes
    async deletePatient(id) {
        connect(process.env.MONGO_DB_URI);

        const Patient = model('Patient', PatientSchema);

        return await Patient.findOneAndDelete(id).exec();
    }

    getPatientDocuments() {

    }

    createPatientDocument() {

    }

}

export default DatabaseAccess;