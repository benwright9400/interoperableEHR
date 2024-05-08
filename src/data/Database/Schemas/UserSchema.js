"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientSchema = void 0;
const mongoose_1 = require("mongoose");
const PatientSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true }, //dd/mm/yyyy
    address: { type: String, required: true }, //House number, street, town/city, county, state (if applicable), country, postcode
    alternativeIdentifiers: [Object] //{ source: <UNIQUE_ORGANISATION_NAME>, id: <ID_USED_WITHIN_ORGANISATION> }
});
exports.PatientSchema = PatientSchema;
