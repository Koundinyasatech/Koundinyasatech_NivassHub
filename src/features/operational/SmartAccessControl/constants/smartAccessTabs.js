import QRGatePassManagement from "../sections/QRGatePassManagement/QRGatePassManagement";
import BoomBarrierConfig from "../sections/BoomBarrierConfig/BoomBarrierConfig";
import VideoIntercomSettings from "../sections/VideoIntercomSettings/VideoIntercomSettings";
import FaceRecognitionEnrollment from "../sections/FaceRecognitionEnrollment/FaceRecognitionEnrollment";
import MultiGateLogs from "../sections/MultiGateLogs/MultiGateLogs";
import AccessAnomalyAI from "../sections/AccessAnomalyAI/AccessAnomalyAI";

export const smartAccessTabs = [
  {
    id: "qrGate",
    label: "QR Gate Pass Management",
    title: "QR Gate Pass Management",
    subtitle: "Manage QR-based gate passes.",
    component: QRGatePassManagement,
  },
  {
    id: "boomBarrier",
    label: "Boom Barrier Config",
    title: "Boom Barrier Config",
    subtitle: "Configure boom barrier settings.",
    component: BoomBarrierConfig,
  },
  {
    id: "videoIntercom",
    label: "Video Intercom Settings",
    title: "Video Intercom Settings",
    subtitle: "Manage video intercom settings.",
    component: VideoIntercomSettings,
  },
  {
    id: "faceRecognition",
    label: "Face Recognition Enrollment",
    title: "Face Recognition Enrollment",
    subtitle: "Manage face recognition enrollment.",
    component: FaceRecognitionEnrollment,
  },
  {
    id: "multiGate",
    label: "Multi-gate Log",
    title: "Multi-gate Log",
    subtitle: "View multi-gate access logs.",
    component: MultiGateLogs,
  },
  {
    id: "anomaly",
    label: "Access Anomaly AI",
    title: "Access Anomaly AI",
    subtitle: "Monitor AI-based access anomalies.",
    component: AccessAnomalyAI,
  },
];