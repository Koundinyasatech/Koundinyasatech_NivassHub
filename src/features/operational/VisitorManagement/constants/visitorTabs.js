import PreApprovalReview from "../sections/PreApprovalReview/PreApprovalReview";
import EntryExitAudit from "../sections/EntryExitAudit/EntryExitAudit";
import FrequentVisitorWhitelist from "../sections/FrequentVisitorWhitelist/FrequentVisitorWhitelist";
import CabDeliveryOverrides from "../sections/CabDeliveryOverrides/CabDeliveryOverrides";
import VisitorAnalytics from "../sections/VisitorAnalytics/VisitorAnalytics";
import FlaggedEntries from "../sections/FlaggedEntries/FlaggedEntries";

export const visitorTabs = [
  {
    id: "preapproval",
    label: "Pre-Approval Review",
    title: "Pre-Approval Review",
    subtitle:
      "Manage visitor pre-approval requests.",
    component: PreApprovalReview,
  },
  {
    id: "entryexit",
    label: "Entry / Exit Audit",
    title: "Entry / Exit Audit",
    subtitle:
      "Monitor visitor entry and exit logs.",
    component: EntryExitAudit,
  },
  {
    id: "whitelist",
    label: "Frequent Visitor Whitelist",
    title: "Frequent Visitor Whitelist",
    subtitle:
      "Manage frequently approved visitors.",
    component: FrequentVisitorWhitelist,
  },
  {
    id: "cabdelivery",
    label: "Cab & Delivery Overrides",
    title: "Cab & Delivery Overrides",
    subtitle:
      "Manage cab and delivery access overrides.",
    component: CabDeliveryOverrides,
  },
  {
    id: "analytics",
    label: "Visitor Analytics",
    title: "Visitor Analytics",
    subtitle:
      "View visitor insights and statistics.",
    component: VisitorAnalytics,
  },
  {
    id: "flagged",
    label: "Flagged Entries",
    title: "Flagged Entries",
    subtitle:
      "Review flagged visitor entries.",
    component: FlaggedEntries,
  },
];