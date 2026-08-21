import DocumentRepository from "../sections/DocumentRepository/DocumentRepository";
import NOCGenerator from "../sections/NOCGenerator/NOCGenerator";
import ReceiptArchive from "../sections/ReceiptArchive/ReceiptArchive";
import MaintenanceLogs from "../sections/MaintenanceLogs/MaintenanceLogs";
import AccessControl from "../sections/AccessControl/AccessControl";
import VersionHistory from "../sections/VersionHistory/VersionHistory";

export const documentTabs = [
  {
    id: "documentRepository",
    label: "Document Repository",
    component: DocumentRepository,
  },
  {
    id: "nocGenerator",
    label: "NOC Generator",
    component: NOCGenerator,
  },
  {
    id: "receiptArchive",
    label: "Receipt Archive",
    component: ReceiptArchive,
  },
  {
    id: "maintenanceLogs",
    label: "Maintenance Logs",
    component: MaintenanceLogs,
  },
  {
    id: "accessControl",
    label: "Access Control",
    component: AccessControl,
  },
  {
    id: "versionHistory",
    label: "Version History",
    component: VersionHistory,
  },
];