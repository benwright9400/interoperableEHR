import { useEffect, useState } from "react";
import ServerURL from "../../util/ServerURL";
import DynamicContentDisplay from "../DynamicContentDisplay";
import SuccessPopup from "../util/SuccessPopup";

const INPUT = "INPUT";
const RESULTS = "RESULTS";
const SUCCESS = "SUCCESS";

function ImportsPage() {
  const [plugins, setPlugins] = useState([]);
  const [selectedPlugin, setSelectedPlugin] = useState("");

  const [page, setPage] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
    city: "",
    post_code: "",
  });

  useEffect(() => {
    //get list of plugins
    fetch(ServerURL.getURL() + "/api/plugins")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPlugins(res);

        if (res.length > 0) {
          setSelectedPlugin(res[0]);
        }
      });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  //get searchable patient data
  function getPatientResults() {
    //get patient results
    //display results
    console.log(selectedPlugin);

    fetch(ServerURL.getURL() + "/api/patients/external", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        plugin: selectedPlugin,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.entry);

        if (res.entry && res.entry.length > 0) {
          setSearchResults(res.entry);
        }

        setPage(RESULTS);
      });
  }

  function importPatientData(patientToImport) {
    console.log("importing patient");
    console.log(patientToImport);

    //use route to import patient data

    fetch(ServerURL.getURL() + "/api/patients/external/healthdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: patientToImport.resource.id,
        plugin: selectedPlugin,
        name:
          patientToImport.resource.name[0].given[0] +
          " " +
          patientToImport.resource.name[0].family,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        //error condition

        //On Success
        if (res.length > 0) {
          //show alert
          setPage(SUCCESS);
        }
      });
  }

  if (page === SUCCESS) {
    return (
      <SuccessPopup
        title={"Patient imported"}
        content={
          "The patient and associated pieces of information have been imported using the selected plugin"
        }
        onClose={() => setPage(INPUT)}
      />
    );
  }

  if (page === RESULTS) {
    return (
      <div className="py-10">
        {/* Header */}
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Import data
            </h1>
          </div>
        </header>

        {/* Body */}
        <main>
          {searchResults.map((result, index) => {
            return (
              <div key={index} className="mx-8 my-2 shadow-md rounded-md p-4">
                <dl className="divide-y divide-gray-100">
                  <div className="grid grid-cols-4 mt-1 text-sm text-gray-700 col-span-3 sm:mt-0 py-2">
                    <dt className="text-sm font-medium leading-6 col-span-2 text-gray-900">
                      Name:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {result.resource.name[0].given[0] +
                        " " +
                        result.resource.name[0].family}
                    </dd>
                  </div>

                  <div className="grid grid-cols-4 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-2">
                    <dt className="text-sm font-medium leading-6 col-span-2 text-gray-900">
                      Born:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {result.resource.birthDate}
                    </dd>
                  </div>

                  <div className="grid grid-cols-4 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-2">
                    <dt className="text-sm font-medium leading-6 col-span-2 text-gray-900">
                      Gender:
                    </dt>
                    <dd className="grid grid-cols-4mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-2">
                      {result.resource.gender}
                    </dd>
                  </div>

                  <div className="grid grid-cols-4 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 py-2">
                    <dt className="text-sm font-medium leading-6 col-span-2 text-gray-900">
                      Address:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ml-2">
                      {"address" in result.resource ? (
                        <DynamicContentDisplay
                          input={result.resource.address}
                        />
                      ) : null}
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="rounded-md mt-8 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => importPatientData(result)}
                >
                  Import patient data
                </button>
              </div>
            );
          })}
        </main>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Header */}
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Import data
          </h1>
        </div>
      </header>

      {/* Body */}
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Import */}
          <div className="sm:col-span-3 mt-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Import using using
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {plugins.map((plugin) => (
                  <option value={plugin}>{plugin}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Names */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setData({ ...data, first_name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setData({ ...data, last_name: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Birthdate */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of birth (DD/MM/YYYY)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setData({ ...data, birth_date: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setData({ ...data, city: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Post code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setData({ ...data, post_code: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md mt-8 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={getPatientResults}
          >
            Search
          </button>
        </div>
      </main>
    </div>
  );
}

export default ImportsPage;
