const excludedFields = ["meta", "text", "identifier", "url", "resourceType", "id", "extension", "active"];

const hiddenKeys = ["0", "valueString"]; //hides keys but displays content

function DynamicContentDisplay(props) {
  let input = props.input;

  return (
    <div
      className={
        "mt-2 border-t border-gray-100 h-[" +
        window.innerHeight -
        200 +
        "px] overflow-y-auto"
      }
    >
      <dl className="divide-y divide-gray-100">
        {Object.keys(input).map((key) => {
          if (excludedFields.indexOf(key) != -1) {
            return <></>;
          }

          function getContent(localInput, localKey) {
            // console.log(typeof localInput[localKey]);

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

            
            if (excludedFields.indexOf(localKey) != -1) {
              return <></>;
            }

            return (
              <div>
                <dt className="text-sm font-medium leading-6 col-span-2 text-gray-900">
                  {hiddenKeys.indexOf(localKey) === -1 ? localKey : null}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {localInput[localKey]}
                </dd>
              </div>
            );
          }

          return (
            <div className="px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6  col-span-2 text-gray-900">
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

export default DynamicContentDisplay;
