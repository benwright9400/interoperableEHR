import CarePlan from "../components/default_pages/CarePlan";
import TreatmentHistory from "../components/default_pages/TreatmentHistory";

class DefaultContentLoader {

    static getPage(name) {

        if (name === "TREATMENT_HISTORY") {
            return <TreatmentHistory />;
        }

        if (name === "CARE_PLAN") {
            return <CarePlan />;
        }

        return <h1>Please select a page</h1>;

    }

}

export default DefaultContentLoader;