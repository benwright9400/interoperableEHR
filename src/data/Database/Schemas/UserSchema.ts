import { Schema } from "mongoose"

interface IPatient {
    fullName: String,
    dateOfBirth: String,
    address: String,
    alternativeIdentifiers: [Object]
}

const PatientSchema = new Schema<IPatient>({
    fullName: {type: String, required: true},
    dateOfBirth: {type: String, required: true}, //dd/mm/yyyy
    address: {type: String, required: true}, //House number, street, town/city, county, state (if applicable), country, postcode
    alternativeIdentifiers: [Object] //{ source: <UNIQUE_ORGANISATION_NAME>, id: <ID_USED_WITHIN_ORGANISATION> }
});

export { IPatient, PatientSchema };