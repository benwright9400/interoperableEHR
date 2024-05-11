import { PlusCircleIcon } from "@heroicons/react/20/solid";
import CarePlanDynamicContentDisplay from "../CarePlanDynamicContentDisplay";
import DynamicContentDisplay from "../DynamicContentDisplay";

const data = [
  {
    resourceType: "CarePlan",
    id: "gpvisit",
    text: {
      status: "additional",
      div: "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <p>  Represents the flow of a patient within a practice. The plan is created when\n        they arrive and represents the 'care' of the patient over the course of that encounter.\n        They first see the nurse for basic observations (BP, pulse, temp) then the doctor for\n        the consultation and finally the nurse again for a tetanus immunization. As the plan is\n        updated (e.g. a new activity added), different versions of the plan exist, and workflow timings\n        for reporting can be gained by examining the plan history. This example is the version after\n        seeing the doctor, and waiting for the nurse.The plan can either be created 'ad hoc' and modified as\n        the parient progresses, or start with a standard template (which can, of course, be altered to suit the patient.</p>\n    </div>",
    },
    contained: [
      {
        resourceType: "Condition",
        id: "p1",
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        code: { text: "Overseas encounter" },
        subject: {
          reference: "Patient/100",
          display: "Peter James Chalmers",
        },
      },
      {
        resourceType: "CareTeam",
        id: "careteam",
        participant: [
          {
            id: "part1",
            role: {
              coding: [
                {
                  system: "http://example.org/local",
                  code: "nur",
                },
              ],
              text: "nurse",
            },
            member: {
              reference: "Practitioner/13",
              display: "Nurse Nancy",
            },
          },
          {
            id: "part2",
            role: {
              coding: [
                {
                  system: "http://example.org/local",
                  code: "doc",
                },
              ],
              text: "doctor",
            },
            member: {
              reference: "Practitioner/14",
              display: "Doctor Dave",
            },
          },
        ],
      },
      {
        resourceType: "Goal",
        id: "goal",
        lifecycleStatus: "planned",
        description: {
          text: "Complete consultation",
        },
        subject: {
          reference: "Patient/100",
          display: "Peter James Chalmers",
        },
      },
      {
        resourceType: "Appointment",
        id: "activity-1",
        status: "fulfilled",
        description: "Nurse consultation",
        start: "2013-01-01T10:38:00+00:00",
        end: "2013-01-01T10:50:00+00:00",
        subject: {
          reference: "Patient/100",
          display: "Peter James Chalmers",
        },
        participant: [
          {
            actor: {
              reference: "Patient/100",
              display: "Peter James Chalmers",
            },
            required: true,
            status: "accepted",
          },
          {
            type: [
              {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                    code: "ATND",
                  },
                ],
              },
            ],
            actor: {
              reference: "Practitioner/13",
              display: "Nurse Nancy",
            },
            required: true,
            status: "accepted",
          },
        ],
      },
      {
        resourceType: "Appointment",
        id: "activity-2",
        status: "proposed",
        description: "Doctor Consultation",
        subject: {
          reference: "Patient/100",
          display: "Peter James Chalmers",
        },
        participant: [
          {
            actor: {
              reference: "Patient/100",
              display: "Peter James Chalmers",
            },
            required: true,
            status: "accepted",
          },
          {
            type: [
              {
                coding: [
                  {
                    system:
                      "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                    code: "ATND",
                  },
                ],
              },
            ],
            actor: {
              reference: "Practitioner/14",
              display: "Doctor Dave",
            },
            required: true,
            status: "accepted",
          },
        ],
      },
    ],
    status: "active",
    intent: "plan",
    subject: {
      reference: "Patient/100",
      display: "Peter James Chalmers",
    },
    period: {
      start: "2013-01-01T10:30:00+00:00",
    },
    careTeam: [{ reference: "#careteam" }],
    addresses: [
      {
        reference: {
          reference: "#p1",
          display: "obesity",
        },
      },
    ],
    goal: [{ reference: "#goal" }],
    activity: [
      {
        performedActivity: [
          {
            reference: {
              reference: "Encounter/example",
            },
          },
        ],
        plannedActivityReference: {
          reference: "#activity-1",
        },
      },
      {
        plannedActivityReference: {
          reference: "#activity-2",
        },
      },
    ],
  },
];

function ViewIndividualCarePlan(props) {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6 overflow-y-auto">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Care Plan
          </h2>
        </div>
      </div>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            gpvisit
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Represents the flow of a patient within a practice. The plan is
            created when they arrive and represents the 'care' of the patient
            over the course of that encounter. They first see the nurse for
            basic observations (BP, pulse, temp) then the doctor for the
            consultation and finally the nurse again for a tetanus immunization.
            As the plan is updated (e.g. a new activity added), different
            versions of the plan exist, and workflow timings for reporting can
            be gained by examining the plan history. This example is the version
            after seeing the doctor, and waiting for the nurse.The plan can
            either be created 'ad hoc' and modified as the parient progresses,
            or start with a standard template (which can, of course, be altered
            to suit the patient).
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {data.map((item) => (
              <CarePlanDynamicContentDisplay openAddItemPopup={props.openAddItemPopup} input={item} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ViewIndividualCarePlan;
