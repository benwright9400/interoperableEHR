const data = require('../../PluginRules.json');

class RulesParser {

    constructor() {

    }

    getSubjectRules(subject: String) {
        let list = data["rules"];
        let subjects = [];

        list.forEach(element => {
            if (element["subject"] === subject) {
                subjects.push(element);
            }
        });

        return subjects;
    }

    public getRoute(subject: String, input: Object) {

        let rules = this.getSubjectRules(subject);

        let applicableRules = [];

        console.log("rules for this subject: " + rules.length)

        rules.forEach(rule => {
            let conditions = Object.keys(rule.condition);

            console.log("conditions");
            console.log(conditions);

            let conditionsApply = true;

            conditions.forEach(key => {
                if (rule["condition"][key] != input[key]) {
                    conditionsApply = false;
                    console.log(rule["condition"][key] + " is not equal to " + input[key])
                }
            })

            if (conditionsApply) {
                applicableRules.push(rule);
            }

        });

        if (applicableRules.length > 1) {
            return "ERROR_MULTIPLE_RULES_APPLY";
        }

        if (applicableRules.length == 1) {
            return applicableRules[0]["route"]
        }

        return "DEFAULT";

    }

}

export default RulesParser;