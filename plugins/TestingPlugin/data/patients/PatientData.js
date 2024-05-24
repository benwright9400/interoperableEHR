"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class PatientData {
    constructor() { }
    getPatient(localPatientID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = fetch(`https://demo.kodjin.com/fhir/Patient/${localPatientID}`);
            let formattedResponse = (yield response).json();
            return formattedResponse;
        });
    }
    getPatients(params) {
        return __awaiter(this, void 0, void 0, function* () {
            //search parameters limited by amount of data in api
            let response = yield fetch(`https://demo.kodjin.com/fhir/Patient?name=${params.first_name}&limit=30&_pretty=true`);
            let formattedResponse = yield response.json();
            console.log(formattedResponse);
            return formattedResponse;
        });
    }
    //Returns a list of all relevent health documents
    getPatientHealthData(localPatientID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("local id is: " + localPatientID);
            let i = 0;
            try {
                let data = [];
                //AllergyIntolerance
                let response = yield fetch(`https://demo.kodjin.com/fhir/AllergyIntolerance?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //Condition
                response = yield fetch(`https://demo.kodjin.com/fhir/Condition?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //Procedure
                response = yield fetch(`https://demo.kodjin.com/fhir/Procedure?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //FamilyMemberHistory
                response = yield fetch(`https://demo.kodjin.com/fhir/FamilyMemberHistory?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                // //AdverseEvent
                // response = await fetch(`https://demo.kodjin.com/fhir/AdverseEvent?patient=${localPatientID}`);
                // data.push(await response.json());
                // console.log(++i);
                //CarePlan
                response = yield fetch(`https://demo.kodjin.com/fhir/CarePlan?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //Goal
                response = yield fetch(`https://demo.kodjin.com/fhir/Goal?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //CareTeam
                response = yield fetch(`https://demo.kodjin.com/fhir/CareTeam?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //ClinicalImpression
                response = yield fetch(`https://demo.kodjin.com/fhir/ClinicalImpression?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //DetectedIssue
                response = yield fetch(`https://demo.kodjin.com/fhir/DetectedIssue?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //ServiceRequest
                response = yield fetch(`https://demo.kodjin.com/fhir/ServiceRequest?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //VisionPrescription
                response = yield fetch(`https://demo.kodjin.com/fhir/VisionPrescription?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //RiskAssessment
                response = yield fetch(`https://demo.kodjin.com/fhir/RiskAssessment?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //NutritionIntake
                response = yield fetch(`https://demo.kodjin.com/fhir/NutritionIntake?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //NutritionOrder
                response = yield fetch(`https://demo.kodjin.com/fhir/NutritionOrder?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //Observation
                response = yield fetch(`https://demo.kodjin.com/fhir/Observation?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //DiagnosticReport
                response = yield fetch(`https://demo.kodjin.com/fhir/DiagnosticReport?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //ServiceRequest
                response = yield fetch(`https://demo.kodjin.com/fhir/ServiceRequest?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //ImagingSelection
                response = yield fetch(`https://demo.kodjin.com/fhir/ImagingSelection?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //ImagingStudy
                response = yield fetch(`https://demo.kodjin.com/fhir/ImagingStudy?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //MolecularSequence
                response = yield fetch(`https://demo.kodjin.com/fhir/MolecularSequence?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //Specimen
                response = yield fetch(`https://demo.kodjin.com/fhir/Specimen?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                //BodyStructure
                response = yield fetch(`https://demo.kodjin.com/fhir/BodyStructure?patient=${localPatientID}`);
                data.push(yield response.json());
                console.log(++i);
                let items = yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
                    if ("entry" in item) {
                        if ("fullUrl" in item.entry) {
                            response = yield fetch(item.entry.fullUrl);
                            return (yield response.json()).resource;
                        }
                        return item.entry;
                    }
                    else if ("link" in item) {
                        return;
                    }
                    else {
                        return [item];
                    }
                })));
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
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
}
exports.default = PatientData;
