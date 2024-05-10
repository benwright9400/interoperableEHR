const { default: DatabaseAccess } = require('../src/data/Database/DatabaseAccess');

describe("Test Patient creation and retrieval", () => {

    let databaseAccess = (new DatabaseAccess());

    let patient = {};

    test("It should create a new patient", function (done) {
        databaseAccess.getOrCreatePatient("Alexander Boris Charles", "21/09/1998", "10, Downing street, London, Westminster, England, SW12 1HV", [{ databaseOne: 78 }]).then((result) => {
            patient = result;

            console.log(result);

            expect(
                result.fullName
            ).toBe("Alexander Boris Charles");

            done();
        });
    });

    test("It should create a new document", function (done) {
        databaseAccess.createPatientDocument(patient._id, (new Date()).toISOString(), "NOTE", { content: "This is a note for this patient" }).then((result) => {

            console.log(result);

            expect(
                result.patientId
            ).toBe(patient._id.toString());

            expect(
                result.documentType
            ).toBe("NOTE");

            done();
        });
    });

    test("It should get all documents", function (done) {
        databaseAccess.getPatientDocuments(patient._id).then((results) => {

            console.log(results);

            expect(
                results.length
            ).toBeGreaterThan(0);

            done();
        });
    });

    test("It should retrieve the newly created patient", function (done) {
        databaseAccess.getOrCreatePatient("Alexander Boris Charles", "21/09/1998", "10, Downing street, London, Westminster, England, SW12 1HV", [{ databaseOne: 78 }]).then((result) => {

            console.log(result);

            expect(
                result._id.toString()
            ).toBe(patient._id.toString());

            // databaseAccess.deletePatient(patient._id);
            done();
        });
    });
});
