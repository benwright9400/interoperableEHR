import DataAccess from "../data/DataAccess";

class PatientFormatter {

    constructor() {}

    async getPatientName() {
        let patientData = (new DataAccess()).getPatientData();

        let patient = await patientData.getPatient();

        let patientName = patient.name[0];

        console.log(patientName.given);

        return patientName.given[0] + " " + patientName.family;
    }

}

export default PatientFormatter;