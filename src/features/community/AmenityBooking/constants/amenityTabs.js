import AmenityCatalogue from "../sections/AmenityCatalogue/AmenityCatalogue";
import BookingCalendar from "../sections/BookingCalendar/BookingCalendar";
import ApprovalQueue from "../sections/ApprovalQueue/ApprovalQueue";
import BookingFeeConfig from "../sections/BookingFeeConfig/BookingFeeConfig";
import MaintenanceClosure from "../sections/MaintenanceClosure/MaintenanceClosure";
import UtilisationReports from "../sections/UtilisationReports/UtilisationReports";

export const amenityTabs = [
  {
    id: "catalogue",
    label: "Amenity Catalogue",
    component: AmenityCatalogue,
  },
  {
    id: "calendar",
    label: "Booking Calendar",
    component: BookingCalendar,
  },
  {
    id: "approvalQueue",
    label: "Approval Queue",
    component: ApprovalQueue,
  },
  {
    id: "feeConfig",
    label: "Booking Fee Config",
    component: BookingFeeConfig,
  },
  {
    id: "maintenance",
    label: "Maintenance Closure",
    component: MaintenanceClosure,
  },
  {
    id: "utilisation",
    label: "Utilisation Reports",
    component: UtilisationReports,
  },
];