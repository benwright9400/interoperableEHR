/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    ShieldCheckIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useAuth0 } from '@auth0/auth0-react'
import LoginPage from '../Login'
import DynamicContentDisplay from './DynamicContentDisplay'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function MobileSidebar(props) {
    const [searchOpen, setSearchOpen] = useState(false);

    return <Transition.Root show={props.sidebarOpen} as={Fragment}>
        <Dialog className="relative z-50 lg:hidden" onClose={props.setSidebarOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" className="-m-2.5 p-2.5" onClick={() => props.setSidebarOpen(false)}>
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                            {!searchOpen ? <div className="flex flex-row h-16 shrink-0 items-center border-b border-gray-900/10">
                                <p>Patient name</p>
                                <UsersIcon className='ml-auto text-gray-400 hover:text-gray-500 hover:cursor-pointer h-6 w-6 shrink-0' onClick={() => setSearchOpen(!searchOpen)}>
                                    Patient
                                </UsersIcon>
                            </div> : <div className="flex flex-row relative h-16 shrink-0 items-center border-b border-gray-900/10">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="Search"
                                    type="search"
                                />
                                <XMarkIcon className='absolute right-2 text-gray-400 hover:text-gray-500 hover:cursor-pointer h-6 w-6 shrink-0' onClick={() => setSearchOpen(!searchOpen)}>
                                    Patient
                                </XMarkIcon>
                            </div>}

                            <nav className="flex flex-1 flex-col">
                                {searchOpen ? <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">Patient information</h3>
                                    </div>
                                    <div className="border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <div className="px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0 hover:cursor-pointer hover:bg-gray-200">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">James Gray</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">21/04/2002</dd>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">10 Downing street</dd>
                                            </div>
                                            <div className="px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0 hover:cursor-pointer hover:bg-gray-200">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Charles Gray</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">21/04/1997</dd>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">11 Oxford street</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </ul> : <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">Patient information</h3>
                                    </div>
                                    <div className="border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Current conditions</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Cancer<br></br>Headache<br></br>Eczema</dd>
                                            </div>
                                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Medications</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Med a - 10mg<br></br>Med b - 5mg</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <li className="mt-auto">
                                        <div
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 border-t"
                                        >
                                            <UserIcon
                                                className="h-6 w-6 shrink-0 text-gray-400 cursor-pointer hover:text-indigo-600"
                                                aria-hidden="true"
                                            />
                                            <ShieldCheckIcon
                                                className="h-6 w-6 shrink-0 text-gray-400 cursor-pointer hover:text-indigo-600"
                                                aria-hidden="true"
                                            />
                                            <UsersIcon
                                                className="h-6 w-6 shrink-0 text-gray-400 cursor-pointer hover:text-indigo-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </li>
                                </ul>}
                            </nav>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>;
}

function DesktopSidebar() {
    const [searchOpen, setSearchOpen] = useState(false);

    return <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-2">
            {!searchOpen ? <div className="flex flex-row h-16 shrink-0 items-center border-b border-gray-900/10">
                <p>Patient name</p>
                <UsersIcon className='ml-auto text-gray-400 hover:text-gray-500 hover:cursor-pointer h-6 w-6 shrink-0' onClick={() => setSearchOpen(!searchOpen)}>
                    Patient
                </UsersIcon>
            </div> : <div className="flex flex-row relative h-16 shrink-0 items-center border-b border-gray-900/10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                />
                <XMarkIcon className='absolute right-2 text-gray-400 hover:text-gray-500 hover:cursor-pointer h-6 w-6 shrink-0' onClick={() => setSearchOpen(!searchOpen)}>
                    Patient
                </XMarkIcon>
            </div>}
            <nav className="flex flex-1 flex-col">
                {searchOpen ? <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Patient information</h3>
                    </div>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0 hover:cursor-pointer hover:bg-gray-200">
                                <dt className="text-sm font-medium leading-6 text-gray-900">James Gray</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">21/04/2002</dd>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">10 Downing street</dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0 hover:cursor-pointer hover:bg-gray-200">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Charles Gray</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">21/04/1997</dd>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">11 Oxford street</dd>
                            </div>
                        </dl>
                    </div>
                </ul> : <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Patient information</h3>
                    </div>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Current conditions</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Cancer<br></br>Headache<br></br>Eczema</dd>
                            </div>
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Medications</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Med a - 10mg<br></br>Med b - 5mg</dd>
                            </div>
                        </dl>
                    </div>
                    <li className="mt-auto">
                        <div
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 border-t"
                        >
                            <UserIcon
                                className="h-6 w-6 shrink-0 text-gray-400 cursor-pointer hover:text-indigo-600"
                                aria-hidden="true"
                            />
                            <ShieldCheckIcon
                                className="h-6 w-6 shrink-0 text-gray-400 cursor-pointer hover:text-indigo-600"
                                aria-hidden="true"
                            />
                            <UsersIcon
                                className="h-6 w-6 shrink-0 text-gray-400 cursor-pointer hover:text-indigo-600"
                                aria-hidden="true"
                            />
                        </div>
                    </li>
                </ul>}
            </nav>
        </div>
    </div>;
}

function setMainAppToken(token) {
    console.log("token val");
    console.log(token);
    window.mainAppToken = token;
}

export default function PatientSidebar() {
    const { logout, user, isAuthenticated, isLoading, getAccessTokenSilently } =
        useAuth0();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [token, setToken] = useState("")

    function setAppToken(tok) {
        setMainAppToken(tok);
    }

    useEffect(function () {
        if (isAuthenticated && token === "") {
            getAccessTokenSilently().then((tokenVal) => {
                setAppToken(tokenVal);
                setToken(tokenVal);
            });
        }
    });

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return (
        <>
            <div className='h-screen overflow-clip'>
                <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <DesktopSidebar />

                <div className="flex flex-col lg:pl-72">
                    <div className="flex sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="hidden sm:flex sm:space-x-8">
                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <a
                                    href="#"
                                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Treatment History
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:space-x-8">
                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <a
                                    href="#"
                                    className="inline-flex items-center hover:border-b-2 hover:border-grey-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Care plan
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:space-x-8">
                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <a
                                    href="#"
                                    className="inline-flex items-center hover:border-b-2 hover:border-grey-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Results
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:space-x-8">
                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <a
                                    href="#"
                                    className="inline-flex items-center hover:border-b-2 hover:border-grey-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Notes
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:space-x-8">
                                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                <a
                                    href="#"
                                    className="inline-flex items-center hover:border-b-2 hover:border-grey-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Requests
                                </a>
                            </div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Separator */}
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="h-8 w-8 rounded-full"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                            onClick={
                                                                item.name == "Sign out" ? logout : ""
                                                            }
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="p-4 flex flex-grow flex-1">
                        <div className="w-full h-full">
                            {/* <iframe
                                id="body-iframe"
                                className="w-full"
                                height={window.outerHeight - 200}
                                src={
                                    "http://localhost:3000/test/ui"
                                }
                            ></iframe> */}
                            <DynamicContentDisplay input={{ name: "Ben", age: 21, occupation: "student" }} />
                        </div>
                    </main>
                </div >
            </div >
        </>
    )
}
