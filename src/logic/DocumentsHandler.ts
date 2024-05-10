import DatabaseAccess from "../data/Database/DatabaseAccess";

class DocumentsHandler {

    async getPatientDocuments(id: String) {
    let databaseAccess = new DatabaseAccess();

    return await databaseAccess.getPatientDocuments(id);
}

}

export default DocumentsHandler;