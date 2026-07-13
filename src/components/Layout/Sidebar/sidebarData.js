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
    children: [],
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
    children: [],
  },
];