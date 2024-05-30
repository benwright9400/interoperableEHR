import { useState } from "react";
import Pages from "../util/Pages";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import TreatmentForm from "./TreatmentForm";
import ResourceTypes from "../util/ResourceTypes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SubPage(props) {
  const [subPage, setSubPage] = useState(Pages.TREATMENT_SELECTION);

  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const people = [
    {
      name: "Observation",
      username: "@lesliealexander",
      code: ResourceTypes.OBSERVATION,
    },
    {
      name: "CarePlan",
      username: "@lesliealexander",
      code: ResourceTypes.CARE_PLAN,
    },
    {
      name: "Condition",
      username: "@lesliealexander",
      code: ResourceTypes.CONDITION,
    },
    {
      name: "Medication",
      username: "@lesliealexander",
      code: ResourceTypes.MEDICATION,
    },
    {
      name: "Clinical Impression",
      username: "@lesliealexander",
      code: ResourceTypes.CLINICAL_IMPRESSION,
    },
  ];

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  if (subPage === Pages.TREATMENT_FORM_PAGE) {
    return (
      <TreatmentForm
        treatmentType={selectedPerson.code}
        back={() => setSubPage(Pages.TREATMENT_SELECTION)}
        finish={() => setSubPage(Pages.TREATMENT_COMPLETE_PAGE)}
        patientId={props.patientId}
      />
    );
  }

  return (
    <div>
      <Combobox
        as="div"
        value={selectedPerson}
        onChange={(person) => {
          setQuery("");
          setSelectedPerson(person);
        }}
      >
        <h4 className="block text-sm font-medium leading-6 text-gray-900">
          Item to add
        </h4>
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery("")}
            displayValue={(person) => person?.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredPeople.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.username}
                  value={person}
                  className={({ focus }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      focus ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ focus, selected }) => (
                    <>
                      <div className="flex">
                        <span
                          className={classNames(
                            "truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {person.name}
                        </span>
                        <span
                          className={classNames(
                            "ml-2 truncate text-gray-500",
                            focus ? "text-indigo-200" : "text-gray-500"
                          )}
                        >
                          {person.username}
                        </span>
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            focus ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      <div className="mt-[50%] ml-auto w-fit">
        <button
          type="button"
          className="ml-auto items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setSubPage(Pages.TREATMENT_FORM_PAGE)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function AddTreatment(props) {
  //pages
  // Select treatment type, Treatment page, complete page

  return (
    <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flew-row">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Treatment History
          </h2>
        </div>
        <div className="flex">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => props.setPage(Pages.HOME)}
          >
            Back
          </button>
        </div>
      </header>

      {/* Horizontal divider */}
      <div className="border-b border-1 my-8"></div>

      {/* Page content */}
      <div className="">
        <SubPage patientId={props.patientId} />
      </div>
    </div>
  );
}
