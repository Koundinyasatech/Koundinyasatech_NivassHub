export const reminderSettings = [
  {
    id: 1,
    title: "24-hour reminder",
    description: "Push notification to resident",
    enabled: true,
  },
  {
    id: 2,
    title: "48-hour reminder",
    description: "Push + SMS to resident",
    enabled: true,
  },
  {
    id: 3,
    title: "72-hour reminder",
    description: "Final notice before escalation",
    enabled: true,
  },
  {
    id: 4,
    title: "Escalate to committee after 72h",
    description: "",
    enabled: false,
  },
];

export const uncollectedAlertsDummyData = [
  {
    id: 1,
    packageId: "PK-5501",
    unit: "C-207",
    courier: "DTDC",
    arrived: "2026-07-06 09:15",
    hoursWaiting: "74h",
  },
  {
    id: 2,
    packageId: "PK-5486",
    unit: "A-203",
    courier: "Amazon",
    arrived: "2026-07-05 18:02",
    hoursWaiting: "89h",
  },
];