import { Schema } from "mongoose"

interface IDocument {
    patientId: String,
    documentDate: String,
    documentType: String,
    documentContent: Object
}

const DocumentSchema = new Schema<IDocument>({
    patientId: { type: String, required: true },
    documentSource: {type: String, required: false},
    documentDate: { type: String, required: true },
    documentType: { type: String, required: true },
    documentContent: { type: Object, required: true }
});

export { IDocument, DocumentSchema };