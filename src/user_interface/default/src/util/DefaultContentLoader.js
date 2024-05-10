import TreatmentHistory from "../components/default_pages/TreatmentHistory";

class DefaultContentLoader {

    static getPage(name) {

        if (name === "TREATMENT_HISTORY") {
            return <TreatmentHistory />;
        }

        return <h1>Please select a page</h1>;

    }

}

export default DefaultContentLoader;