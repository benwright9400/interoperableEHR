class PatientData {
  constructor() {}

  async getPatient(localPatientID: string) {
    let response = fetch(
      `https://demo.kodjin.com/fhir/Patient/${localPatientID}`
    );

    let formattedResponse = (await response).json();

    return formattedResponse;
  }

  async getPatients(params) {
    //search parameters limited by amount of data in api
    let response = await fetch(
      `https://demo.kodjin.com/fhir/Patient?name=${params.first_name}&limit=30&_pretty=true`
    );

    let formattedResponse = await response.json();

    console.log(formattedResponse);

    return formattedResponse;
  }

  //Returns a list of all relevent health documents
  async getPatientHealthData(localPatientID: string) {
    console.log("local id is: " + localPatientID);

    let i = 0;

    try {
      let data = [];

      //AllergyIntolerance
      let response = await fetch(
        `https://demo.kodjin.com/fhir/AllergyIntolerance?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //Condition
      response = await fetch(
        `https://demo.kodjin.com/fhir/Condition?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //Procedure
      response = await fetch(
        `https://demo.kodjin.com/fhir/Procedure?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //FamilyMemberHistory
      response = await fetch(
        `https://demo.kodjin.com/fhir/FamilyMemberHistory?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      // //AdverseEvent
      // response = await fetch(`https://demo.kodjin.com/fhir/AdverseEvent?patient=${localPatientID}`);

      // data.push(await response.json());

      // console.log(++i);

      //CarePlan
      response = await fetch(
        `https://demo.kodjin.com/fhir/CarePlan?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //Goal
      response = await fetch(
        `https://demo.kodjin.com/fhir/Goal?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //CareTeam
      response = await fetch(
        `https://demo.kodjin.com/fhir/CareTeam?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //ClinicalImpression
      response = await fetch(
        `https://demo.kodjin.com/fhir/ClinicalImpression?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //DetectedIssue
      response = await fetch(
        `https://demo.kodjin.com/fhir/DetectedIssue?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //ServiceRequest
      response = await fetch(
        `https://demo.kodjin.com/fhir/ServiceRequest?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //VisionPrescription
      response = await fetch(
        `https://demo.kodjin.com/fhir/VisionPrescription?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //RiskAssessment
      response = await fetch(
        `https://demo.kodjin.com/fhir/RiskAssessment?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //NutritionIntake
      response = await fetch(
        `https://demo.kodjin.com/fhir/NutritionIntake?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //NutritionOrder
      response = await fetch(
        `https://demo.kodjin.com/fhir/NutritionOrder?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);


      //Observation
      response = await fetch(
        `https://demo.kodjin.com/fhir/Observation?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //DiagnosticReport
      response = await fetch(
        `https://demo.kodjin.com/fhir/DiagnosticReport?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //ServiceRequest
      response = await fetch(
        `https://demo.kodjin.com/fhir/ServiceRequest?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //ImagingSelection
      response = await fetch(
        `https://demo.kodjin.com/fhir/ImagingSelection?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //ImagingStudy
      response = await fetch(
        `https://demo.kodjin.com/fhir/ImagingStudy?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //MolecularSequence
      response = await fetch(
        `https://demo.kodjin.com/fhir/MolecularSequence?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //Specimen
      response = await fetch(
        `https://demo.kodjin.com/fhir/Specimen?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);

      //BodyStructure
      response = await fetch(
        `https://demo.kodjin.com/fhir/BodyStructure?patient=${localPatientID}`
      );

      data.push(await response.json());

      console.log(++i);



      let items = await Promise.all(
        data.map(async (item) => {
          if ("entry" in item) {

            if ("fullUrl" in item.entry) {
              response = await fetch(item.entry.fullUrl);

              return (await response.json()).resource;
            }

            return item.entry;
          } else if ("link" in item) {
            return;
          } else {
            return [item];
          }
        })
      );

      let filteredItems = items.filter((item) => {
        if (item) {
          return true;
        }

        return false;
      });

      let finalItems = [];

      filteredItems.forEach((item) => {
        if (Array.isArray(item)) {
          finalItems.push(...item);
          return;
        }

        finalItems.push(item);
      });

      console.log(finalItems);

      return finalItems;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
}

export default PatientData;
