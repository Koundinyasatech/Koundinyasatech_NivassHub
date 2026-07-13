import Owners from "../sections/Owners/Owners";
import Tenants from "../sections/Tenants/Tenants";
import FamilyMembers from "../sections/FamilyMembers/FamilyMembers";
import Vehicles from "../sections/Vehicles/Vehicles";
import KYCApproval from "../sections/KYCApproval/KYCApproval";
import MoveInMoveOut from "../sections/MoveInMoveOut/MoveInMoveOut";

export const residentTabs = [
  {
    id: "owners",
    label: "Owner Profiles",
    title: "Owner Profiles",
    subtitle: "Manage owner information and profiles.",
    component: Owners,
  },
  {
    id: "tenants",
    label: "Tenant Profiles",
    title: "Tenant Profiles",
    subtitle: "Manage tenant information.",
    component: Tenants,
  },
  {
    id: "family",
    label: "Family Member Records",
    title: "Family Member Records",
    subtitle: "Manage family member records.",
    component: FamilyMembers,
  },
  {
    id: "vehicles",
    label: "Vehicle Registry",
    title: "Vehicle Registry",
    subtitle: "Manage resident vehicles.",
    component: Vehicles,
  },
  {
    id: "kyc",
    label: "KYC Approval Workflow",
    title: "KYC Approval Workflow",
    subtitle: "Manage KYC approvals.",
    component: KYCApproval,
  },
  {
    id: "move",
    label: "Move-in / Move-out",
    title: "Move-in / Move-out",
    subtitle: "Manage resident move-in and move-out requests.",
    component: MoveInMoveOut,
  },
];