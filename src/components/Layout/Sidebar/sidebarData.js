import {
  FiHome,
  FiLayers,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiSettings,
} from "react-icons/fi";

export const sidebarData = [
  {
    title: "Foundation",
    key: "foundation",
    icon: FiHome,
    color: "#d96d2c",
    children: [
      {
        title: "Society & Units",
        path: "/foundation/society",
      },
      {
        title: "Residents & Users",
        path: "/foundation/residents",
      },
      {
        title: "Guards & Staff",
        path: "/foundation/guards",
      },
    ],
  },

  {
    title: "Operational",
    key: "operational",
    icon: FiLayers,
    color: "#5b8def",
    children: [
      {
        title: "Visitor Management",
        path: "/operational/visitor-management",
      },
      {
        title: "Package & Delivery",
        path: "/operational/package-delivery",
      },
      {
        title: "Parking Management",
        path: "/operational/parking-management",
      },
      {
        title: "Smart Access Control",
        path: "/operational/smart-access-control",
      },
    ],
  },

  {
    title: "Community",
    key: "community",
    icon: FiUsers,
    color: "#59b36b",
    children: [
      {
        title: "Amenity Booking",
        path: "/community/amenity-booking",
      },
      {
        title: "Notices & Communication",
        path: "/community/notices-communication",
      },
      {
        title: "Polls & Voting",
        path: "/community/polls-voting",
      },
      {
        title: "Society Documents",
        path: "/community/society-documents",
      },
    ],
  },

  {
    title: "Finance",
    key: "finance",
    icon: FiDollarSign,
    color: "#e0a12c",
    children: [],
  },

  {
    title: "Intelligence",
    key: "intelligence",
    icon: FiActivity,
    color: "#8e6bbd",
    children: [],
  },

{
  title: "System / Platform",
  key: "system",
  icon: FiSettings,
  color: "#7d8794",
  children: [
    {
      title: "Society Onboarding Review",
      path: "/system-platform/society-onboarding-review",
    },
    {
      title: "Integrations & APIs",
      path: "/system-platform/integrations-apis",
    },
    {
      title: "Roles & Permissions",
      path: "/system-platform/roles-permissions",
    },
    {
      title: "Audit & System Logs",
      path: "/system-platform/audit-system-logs",
    },
    {
      title: "Billing & Plans",
      path: "/system-platform/billing-plans",
    },
  ],
},
];