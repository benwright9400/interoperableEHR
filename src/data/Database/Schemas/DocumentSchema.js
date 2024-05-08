"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSchema = void 0;
const mongoose_1 = require("mongoose");
const DocumentSchema = new mongoose_1.Schema({
    patientId: { type: String, required: true },
    documentDate: { type: String, required: true },
    documentType: { type: String, required: true },
    documentContent: { type: Object, required: true }
});
exports.DocumentSchema = DocumentSchema;
