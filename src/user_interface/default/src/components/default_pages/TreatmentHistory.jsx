import { useEffect, useState } from "react";
import ServerURL from "../../util/ServerURL";
import DynamicContentDisplay from "../DynamicContentDisplay";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HOME = "HOME";
const ITEM = "ITEM";

function TreatmentHistory(props) {
  const [treatments, setTreatment] = useState([]);

  const [page, setPage] = useState(HOME);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    getPatientData();
  }, []);

  function getPatientData() {
    fetch(ServerURL.getURL() + "/api/document/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        id: props.patientId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTreatment(res);
      });
  }

  if (page === ITEM) {
    return (
      <div className="py-10">
        {/* Header */}
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Treatment History
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex my-4 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setPage(HOME)}
          >
            <ArrowLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Button text
          </button>
          <DynamicContentDisplay input={selectedItem} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Header */}
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Treatment History
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {treatments
          .sort((a, b) => new Date(a.documentDate) > new Date(b.documentDate))
          .map((item, index) => {
            if (item.documentType === "Patient") {
              return <></>;
            }

            let date = new Date(item.documentDate);

            return (
              <div
                className="bg-white hover:bg-slate-100 cursor-pointer group px-4 py-5 sm:px-6 shadow-md rounded-md my-4"
                onClick={() => {
                  setSelectedItem(item.documentContent);
                  setPage(ITEM);
                }}
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <span
                      className={classNames(
                        "bg-blue-400",
                        "h-8 w-8 rounded-full flex items-center justify-center group-hover:bg-blue-500"
                      )}
                    >
                      <DocumentIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.documentType}
                    </p>
                    <p className="text-sm text-gray-500">
                      {date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear()}
                    </p>
                  </div>
                </div>
                {"resource" in item.documentContent &&
                "description" in item.documentContent.resource
                  ? item.documentContent.resource.description
                  : ""}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TreatmentHistory;
