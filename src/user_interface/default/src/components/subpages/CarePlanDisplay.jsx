import { DocumentIcon } from "@heroicons/react/24/outline"

const timeline = [
    {
        id: 1,
        content: 'Care plan for',
        target: 'Broken Fibula',
        href: '#',
        date: '21/05/2024',
        datetime: '2020-09-20',
        icon: DocumentIcon,
        iconBackground: 'bg-blue-400',
    },
    {
        id: 2,
        content: 'Care plan for',
        target: 'Fractured Skull',
        href: '#',
        date: '21/05/2024',
        datetime: '2020-09-20',
        icon: DocumentIcon,
        iconBackground: 'bg-slate-400',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CarePlanDisplay(props) {

    //function to get care plan

    //delegate object association to other props with popups

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                            {eventIdx !== timeline.length - 1 ? (
                                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3 cursor-pointer group" onClick={() => props.onSelect(event.id)}>
                                <div>
                                    <span
                                        className={classNames(
                                            event.iconBackground,
                                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white group-hover:bg-blue-500'
                                        )}
                                    >
                                        <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {event.content}{' '}
                                            <a href={event.href} className="font-medium text-gray-900">
                                                {event.target}
                                            </a>
                                        </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        <time dateTime={event.datetime}>{event.date}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}