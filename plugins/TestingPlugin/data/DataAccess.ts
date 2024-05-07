import PatientData from "./patients/PatientData";

class DataAccess {

    constructor() {}

    getPatientData() {
        return (new PatientData());
    }

}

export default DataAccess;