import GuardProfiles from "../sections/GuardProfiles/GuardProfiles";
import ShiftRoster from "../sections/ShiftRoster/ShiftRoster";
import ClockLogs from "../sections/ClockLogs/ClockLogs";
import DomesticStaff from "../sections/DomesticStaff/DomesticStaff";
import Attendance from "../sections/Attendance/Attendance";
import AgencyManagement from "../sections/AgencyManagement/AgencyManagement";

export const guardTabs = [
  {
    id: "profiles",
    label: "Guard Profiles",
    title: "Guard Profiles",
    subtitle: "Manage security guard profiles and information.",
    component: GuardProfiles,
  },
  {
    id: "roster",
    label: "Shift Roster",
    title: "Shift Roster",
    subtitle: "Manage guard shift schedules and assignments.",
    component: ShiftRoster,
  },
  {
    id: "clocklogs",
    label: "Clock Logs",
    title: "Clock Logs",
    subtitle: "Monitor guard check-in and check-out logs.",
    component: ClockLogs,
  },
  {
    id: "domestic",
    label: "Domestic Staff",
    title: "Domestic Staff",
    subtitle: "Manage domestic staff details and approvals.",
    component: DomesticStaff,
  },
  {
    id: "attendance",
    label: "Attendance",
    title: "Attendance",
    subtitle: "Track guard and staff attendance records.",
    component: Attendance,
  },
  {
    id: "agency",
    label: "Agency Management",
    title: "Agency Management",
    subtitle: "Manage security agencies and vendor information.",
    component: AgencyManagement,
  },
];