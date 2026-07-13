import SocietyProfile from "../sections/SocietyProfile/SocietyProfile";
import TowerManagement from "../sections/TowerManagement/TowerManagement";
import UnitCatalogue from "../sections/UnitCatalogue/UnitCatalogue";
import OwnershipRecords from "../sections/OwnershipRecords/OwnershipRecords";
import SocietySettings from "../sections/SocietySettings/SocietySettings";
import AdminRoles from "../sections/AdminRoles/AdminRoles";

export const societyTabs = [
  {
    id: "profile",
    label: "Society Profile",
    title: "Society Profile",
    subtitle: "Manage society information and office details.",
    component: SocietyProfile,
  },
  {
    id: "towers",
    label: "Tower Management",
    title: "Tower Management",
    subtitle: "Manage towers and blocks.",
    action: {
      type: "tower",
      text: "+ Add Tower",
    },
    component: TowerManagement,
  },
  {
    id: "units",
    label: "Unit Catalogue",
    title: "Unit Catalogue",
    subtitle: "Manage residential units.",
    action: {
      type: "unit",
      text: "+ Add Unit",
    },
    component: UnitCatalogue,
  },
  {
    id: "ownership",
    label: "Ownership Records",
    title: "Ownership Records",
    subtitle: "Manage ownership records.",
    component: OwnershipRecords,
  },
  {
    id: "settings",
    label: "Society Settings",
    title: "Society Settings",
    subtitle: "Manage society settings.",
    component: SocietySettings,
  },
  {
    id: "roles",
    label: "Admin Role Assignment",
    title: "Admin Role Assignment",
    subtitle: "Assign admin roles and permissions.",
    action: {
      type: "role",
      text: "+ Assign Role",
    },
    component: AdminRoles,
  },
];