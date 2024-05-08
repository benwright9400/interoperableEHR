const {default: DatabaseAccess} = require('../src/data/Database/DatabaseAccess');

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


    test("It should retrieve the newly created patient", function (done) {
        databaseAccess.getOrCreatePatient("Alexander Boris Charles", "21/09/1998", "10, Downing street, London, Westminster, England, SW12 1HV", [{ databaseOne: 78 }]).then((result) => {

            console.log(result);

            expect(
                result._id.toString()
            ).toBe(patient._id.toString());

            databaseAccess.deletePatient(patient._id);
            done();
        });
    });
});
