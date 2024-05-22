import DatabaseAccess from "../data/Database/DatabaseAccess";

class PatientsHandler {

    async getAllPatients() {
        let databaseAccess = new DatabaseAccess();

        return await databaseAccess.listPatients();
    }

    async createPatient(patientObject) {
        let databaseAccess = new DatabaseAccess();

        return await databaseAccess.getOrCreatePatient(patientObject.fullName, patientObject.dateOfBirth, patientObject.address, patientObject.alternativeIdentifiers);
    }

}

export default PatientsHandler;