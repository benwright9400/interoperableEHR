import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TailwindDatePicker from "../DatePicker";

const APPOINTMENT = "APPOINTMENT";
const MEDICATION_REQUEST = "MEDICATION_REQUEST";

export default function CreateCarePlanPopup(props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(APPOINTMENT);

  function getButtonStyle(name) {
    if (name === selectedItem) {
      return "relative -ml-px inline-flex items-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-indigo-300 hover:bg-indigo-700 focus:z-10";
    }

    return "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10";
  }

  useEffect(() => {
    if (open != props.open) {
      setOpen(props.open);
    }
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between mt-16">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Add Item
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => props.setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Your content */}
                      <span className="isolate inline-flex rounded-md shadow-sm">
                        <button
                          type="button"
                          className={
                            getButtonStyle(APPOINTMENT) + " rounded-l-md"
                          }
                          onClick={() => setSelectedItem(APPOINTMENT)}
                        >
                          Appointment
                        </button>
                        <button
                          type="button"
                          className={
                            getButtonStyle(MEDICATION_REQUEST) + " rounded-r-md"
                          }
                          onClick={() => setSelectedItem(MEDICATION_REQUEST)}
                        >
                          MedicationRequest
                        </button>
                      </span>
                      {selectedItem === APPOINTMENT ? (
                        <div>
                          <div>
                            <div className="col-span-full mt-4">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={""}
                                />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                Please describe the purpose of the appointment
                              </p>
                            </div>
                            <div className="sm:col-span-3 mt-4">
                              <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Status
                              </label>
                              <div className="mt-2">
                                <select
                                  id="status"
                                  name="status"
                                  autoComplete="status-name"
                                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>proposed</option>
                                  <option>pending</option>
                                  <option>booked</option>
                                  <option>arrived</option>
                                  <option>fulfilled</option>
                                  <option>cancelled</option>
                                  <option>noshow</option>
                                  <option>entered-in-error</option>
                                  <option>checked-in</option>
                                  <option>waitlist</option>
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-3 mt-4">
                              <label
                                htmlFor="appointment-type"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Appointment type
                              </label>
                              <div className="mt-2">
                                <select
                                  id="appointment-type"
                                  name="appointment-type"
                                  autoComplete="appointment-type-name"
                                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>routine</option>
                                  <option>walk-in</option>
                                  <option>checkup</option>
                                  <option>followup</option>
                                  <option>emergency</option>
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-3 mt-4">
                              <label
                                htmlFor="priority"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Priority
                              </label>
                              <div className="mt-2">
                                <select
                                  id="priority"
                                  name="priority"
                                  autoComplete="priority-name"
                                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>ASAP</option>
                                  <option>callback results</option>
                                  <option>elective</option>
                                  <option>emergency</option>
                                  <option>preop</option>
                                  <option>as needed</option>
                                  <option>routine</option>
                                  <option>rush reporting</option>
                                  <option>timing critical</option>
                                  <option>use as directed</option>
                                  <option>urgent</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="start-date"
                                className="block text-sm font-medium leading-6 mt-4 mb-0 text-gray-900"
                              >
                                Start date
                              </label>
                              <div id="start-date">
                                <TailwindDatePicker />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
