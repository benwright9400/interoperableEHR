import DatabaseAccess from "../data/Database/DatabaseAccess";

class DocumentsHandler {

    async getPatientDocuments(id: String) {
        let databaseAccess = new DatabaseAccess();

        return await databaseAccess.getPatientDocuments(id);
    }

    async updateDocument(id: String, newValue: Object) {
        let databaseAccess = new DatabaseAccess();

        return await databaseAccess.updatePatientDocument(id, newValue);
    }

    async createDocument(newValue: Object) {
        let databaseAccess = new DatabaseAccess();

        return await databaseAccess.createPatientDocument(newValue);
    }

}

export default DocumentsHandler;