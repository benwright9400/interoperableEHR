import { UserIcon } from "@heroicons/react/20/solid";

function ParticipantView(props) {
    console.log(props)
  return (
    <div>
      {props.participants.map((participant) => {
        return (
          <div className="grid grid-cols-6 my-8">
            <dt>
               <UserIcon className="w-6" /> 
            </dt>
            {/* <dt className="text-sm font-medium leading-6 col-span-1 text-gray-900">
            Title
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700  col-span-1 sm:mt-0">
              {participant.text}
            </dd> */}
            <dd className="text-sm font-medium leading-6 ml-4 col-span-1 text-gray-900">
            Name
            </dd>
            <dd className="mt-1 text-sm leading-6 ml-4 text-gray-700  col-span-2 sm:mt-0">
              {participant.actor?.display}
            </dd>
          </div>
        );
      })}
    </div>
  );
}

export default ParticipantView;
