import CarePlan from "../components/default_pages/CarePlan";
import ImportsPage from "../components/default_pages/Imports";
import TreatmentHistory from "../components/default_pages/TreatmentHistory";

class DefaultContentLoader {

    static getPage(name) {

        if (name === "TREATMENT_HISTORY") {
            return <TreatmentHistory />;
        }

        if (name === "CARE_PLAN") {
            return <CarePlan />;
        }

        if(name === "IMPORTS") {
            return <ImportsPage />;
        }

        return <h1>Please select a page</h1>;

    }

}

export default DefaultContentLoader;