import { UserIcon } from "@heroicons/react/20/solid";

function SubjectView(props) {
  return (
    <div>
      <div className="grid grid-cols-6">
        <dt>
          <UserIcon className="w-6" />
        </dt>
        <dt className="text-sm font-medium leading-6 col-span-1 text-gray-900">
          Patient
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700  col-span-4 ml-4 sm:mt-0">
          {props.subject.display}
        </dd>
      </div>
    </div>
  );
}

export default SubjectView;
