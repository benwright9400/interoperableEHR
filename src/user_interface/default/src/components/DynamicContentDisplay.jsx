function DynamicContentDisplay(props) {

    let input = props.input;

    return <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
            {
                Object.keys(input).map((key) => {
                    return <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{key}</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{input[key]}</dd>
                    </div>
                })
            }
        </dl>
    </div>;
}

export default DynamicContentDisplay;