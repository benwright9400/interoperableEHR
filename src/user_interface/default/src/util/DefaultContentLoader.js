import CarePlan from "../components/default_pages/CarePlan";
import ImportsPage from "../components/default_pages/Imports";
import Results from "../components/default_pages/Results";
import TreatmentHistory from "../components/default_pages/TreatmentHistory";

class DefaultContentLoader {
  static getPage(name, patientId) {
    if (name === "TREATMENT_HISTORY") {
      return <TreatmentHistory patientId={patientId} />;
    }

    if (name === "CARE_PLAN") {
      return <CarePlan patientId={patientId} />;
    }

    if (name === "IMPORTS") {
      return <ImportsPage patientId={patientId} />;
    }

    if (name === "RESULTS") {
      return <Results patientId={patientId} />;
    }

    return <h1>Please select a page</h1>;
  }
}

export default DefaultContentLoader;
