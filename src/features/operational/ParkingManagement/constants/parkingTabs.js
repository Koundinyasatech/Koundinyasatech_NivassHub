import ParkingSlotCatalogue from "../sections/SlotCatalogue/SlotCatalogue";
import SlotAllocation from "../sections/SlotAllocation/SlotAllocation";
import VisitorParking from "../sections/VisitorParking/VisitorParking";
import MultiVehicleManagement from "../sections/MultiVehicleManagement/MultiVehicleManagement";
import ParkingDuesConfiguration from "../sections/ParkingDuesConfig/ParkingDuesConfig";
import ANPRLogs from "../sections/ANPRLogs/ANPRLogs";

export const parkingTabs = [
  {
    id: "catalogue",
    label: "Slot Catalogue",
    title: "Slot Catalogue",
    subtitle: "Manage parking slot catalogue.",
    component: ParkingSlotCatalogue,
  },
  {
    id: "allocation",
    label: "Slot Allocation",
    title: "Slot Allocation",
    subtitle: "Manage slot allocations.",
    component: SlotAllocation,
  },
  {
    id: "visitor",
    label: "Visitor Parking",
    title: "Visitor Parking",
    subtitle: "Manage visitor parking.",
    component: VisitorParking,
  },
  {
    id: "multiVehicle",
    label: "Multi-vehicle Management",
    title: "Multi-vehicle Management",
    subtitle: "Manage multiple vehicles.",
    component: MultiVehicleManagement,
  },
  {
    id: "dues",
    label: "Parking Dues Config",
    title: "Parking Dues Config",
    subtitle: "Manage parking dues configuration.",
    component: ParkingDuesConfiguration,
  },
  {
    id: "anpr",
    label: "ANPR Log",
    title: "ANPR Log",
    subtitle: "View ANPR logs.",
    component: ANPRLogs,
  },
];