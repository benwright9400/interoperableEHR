import { PlusCircleIcon } from "@heroicons/react/20/solid";
import ParticipantView from "./ParticipantView";
import SubjectView from "./SubjectView";

const excludedFields = [
  // "meta",
  // "text",
  // "identifier"
  "id",
  "text",
];

function CarePlanDynamicContentDisplay(props) {
  let input = props.input;

  return (
    <div
      className={
        "pt-2 border-t border-gray-100 h-[" +
        window.innerHeight -
        200 +
        "px] overflow-y-auto"
      }
    >
      <dl className="divide-y divide-gray-100 relative">
        {Object.keys(input).map((key) => {
          if (excludedFields.indexOf(key) != -1) {
            return <></>;
          }

          function getContent(localInput, localKey) {
            // console.log(typeof localInput[localKey]);

            if (localKey === "resourceType") {
              let subject = localInput[localKey];

              console.log(subject);

              if (subject === "CarePlan") {
                return (
                  <div className="flex flex-row">
                    <dt className="text-sm pl-2 bg-gray-100 mt-10 py-2 font-medium text-gray-900">
                      {subject}
                    </dt>
                    <button
                      type="button"
                      className="absolute right-12 mt-12 ml-auto inline-flex items-center gap-x-2 rounded-md mt-auto bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {console.log("button pressed"); props.openAddItemPopup(true);}}
                    >
                      Add Item
                      <PlusCircleIcon
                        className="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                );
              }

              return (
                <div>
                  <dt className="text-sm pl-2 bg-gray-100 mt-10 py-2 font-medium leading-6 col-span-2 text-gray-900">
                    {subject}
                  </dt>
                </div>
              );
            }

            if (localKey === "participant") {
              let participants = localInput[localKey];

              console.log(participants);

              return <ParticipantView participants={participants} />;
            }

            if (localKey === "subject") {
              let subject = localInput[localKey];

              console.log(subject);

              return <SubjectView subject={subject} />;
            }

            if (localKey === "contained") {
              return localInput[localKey].map((item, index) =>
                Object.keys(item).map((localSubKey) => {
                  if (excludedFields.indexOf(localSubKey) != -1) {
                    return <></>;
                  }

                  return (
                    <dd className="mt-1 text-sm leading-6 border-t border-gray-100 py-2 text-gray-700 sm:col-span-2 sm:mt-0">
                      {getContent(item, localSubKey)}
                    </dd>
                  );
                })
              );
            }

            if (typeof localInput[localKey] === "object") {
              return (
                <div className="ml-4">
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {Object.keys(localInput[localKey]).map((localSubKey) => {
                      return getContent(localInput[localKey], localSubKey);
                    })}
                  </dd>
                </div>
              );
            }

            return (
              <div>
                <dt className="text-sm font-medium leading-6 col-span-2 text-gray-900">
                  {localKey}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {localInput[localKey]}
                </dd>
              </div>
            );
          }

          if (key === "resourceType") {
            return (
              <div className="bg-gray-100 px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                <dd className="mt-1 ml-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {getContent(input, key)}
                </dd>
              </div>
            );
          }

          return (
            <div className="px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
              <dt className="ml-4 text-sm font-medium leading-6  col-span-2 text-gray-900">
                {key}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {getContent(input, key)}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export default CarePlanDynamicContentDisplay;
