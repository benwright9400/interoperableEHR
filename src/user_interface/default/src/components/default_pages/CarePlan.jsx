import { DocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CreateCarePlanPopup from "../subpages/CreateCarePlanPopup";
import CarePlanDisplay from "../subpages/CarePlanDisplay";
import ViewIndividualCarePlan from "../subpages/ViewIndividualCarePlan";

const SEARCH_PAGE = "SEARCH";
const VIEW_PAGE = "VIEW";

export default function CarePlan(props) {
  const [page, setPage] = useState(SEARCH_PAGE);
  const [carePlan, setCarePlan] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);

  function loadCarePlanPage(id) {
    //get care plan by ID

    //switch to care plan page
    setPage(VIEW_PAGE);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
      {page === VIEW_PAGE && (popupOpen || !popupOpen)? (
        <div>
          <CreateCarePlanPopup patientId={props.patientId} open={popupOpen} setOpen={setPopupOpen} />
          <ViewIndividualCarePlan openAddItemPopup={setPopupOpen} patientId={props.patientId} />
        </div>
      ) : (
        <div>
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Care Plan
              </h2>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create care plan
              </button>
            </div>
          </div>
          <CreateCarePlanPopup patientId={props.patientId} open={popupOpen} setOpen={setPopupOpen} />
          <CarePlanDisplay onSelect={loadCarePlanPage} patientId={props.patientId} />
        </div>
      )}
    </div>
  );
}
