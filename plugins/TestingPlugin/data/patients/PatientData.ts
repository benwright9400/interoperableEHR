class PatientData {

    constructor() {}

    async getPatient() {
        let response = fetch("http://hapi.fhir.org/baseR4/Patient/6839219/_history/1?_pretty=true");

        let formattedResponse = (await response).json();

        return formattedResponse;
    }

}

export default PatientData;