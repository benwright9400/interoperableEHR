import DatabaseAccess from "../data/Database/DatabaseAccess";

class PatientsHandler {

    async getAllPatients() {
        let databaseAccess = new DatabaseAccess();

        return await databaseAccess.listPatients();
    }

}

export default PatientsHandler;