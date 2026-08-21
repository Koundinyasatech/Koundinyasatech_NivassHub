import PackageIntakeLog from "../sections/PackageIntakeLog/PackageIntakeLog";
import SmartLockerConfig from "../sections/SmartLockerConfig/SmartLockerConfig";
import DeliveryStatusBoard from "../sections/DeliveryStatusBoard/DeliveryStatusBoard";
import UncollectedAlerts from "../sections/UncollectedAlerts/UncollectedAlerts";
import CourierWhitelist from "../sections/CourierWhitelist/CourierWhitelist";
import HandoverAudit from "../sections/HandoverAudit/HandoverAudit";

export const packageTabs = [
  {
    id: "intake",
    label: "Package Intake Log",
    title: "Package Intake Log",
    subtitle: "Manage incoming packages.",
    component: PackageIntakeLog,
  },
  {
  id: "locker",
  label: "Smart Locker Config",
  title: "Smart Locker Config",
  subtitle: "Configure smart lockers.",
  component: SmartLockerConfig,
},
  {
    id: "delivery",
    label: "Delivery Status Board",
    title: "Delivery Status Board",
    subtitle: "Track package delivery status.",
    component: DeliveryStatusBoard,
  },
  {
    id: "alerts",
    label: "Uncollected Alerts",
    title: "Uncollected Alerts",
    subtitle: "View uncollected package alerts.",
    component: UncollectedAlerts,
  },
  {
    id: "courier",
    label: "Courier Whitelist",
    title: "Courier Whitelist",
    subtitle: "Manage approved courier partners.",
    component: CourierWhitelist,
  },
  {
    id: "handover",
    label: "Handover Audit",
    title: "Handover Audit",
    subtitle: "Review package handover history.",
    component: HandoverAudit,
  },
];