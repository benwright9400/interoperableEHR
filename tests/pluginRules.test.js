const {default: RulesParser} = require("../plugins/pluginManager/RulesParser");

describe("Test the plugin rules method", () => {
    test("One applicable rule", (done) => {
        let rules = new RulesParser();
        let route = rules.getRoute("patient-sidebar", {
            "source": "St Clements"
        });

        expect(route).toBe("/pluginA/ui");
        done();
    })

    test("Error - multiple applicable rules", (done) => {
        let rules = new RulesParser();
        let route = rules.getRoute("test-subject", {
            "source": "St Clements",
            "type": "patient",
        });

        expect(route).toBe("ERROR_MULTIPLE_RULES_APPLY");
        done();
    })

    test("No rules - default returned", (done) => {
        let rules = new RulesParser();
        let route = rules.getRoute("any-other-subject", {
            "source": "St Clements"
        });

        expect(route).toBe("DEFAULT");
        done();
    })
})
