import NoticeComposer from "../sections/NoticeComposer/NoticeComposer";
import SOSAlertDashboard from "../sections/SOSAlertDashboard/SOSAlertDashboard";
import ComplaintTicketing from "../sections/ComplaintTicketing/ComplaintTicketing";
import LostFoundBoard from "../sections/LostFoundBoard/LostFoundBoard";
import EventNotices from "../sections/EventNotices/EventNotices";
import NotificationDeliveryLog from "../sections/NotificationDeliveryLog/NotificationDeliveryLog";

export const noticeTabs = [
  {
    id: "noticeComposer",
    label: "Notice Composer",
    component: NoticeComposer,
  },
  {
    id: "sosAlertDashboard",
    label: "SOS Alert Dashboard",
    component: SOSAlertDashboard,
  },
  {
    id: "complaintTicketing",
    label: "Complaint Ticketing",
    component: ComplaintTicketing,
  },
  {
    id: "lostFoundBoard",
    label: "Lost & Found Board",
    component: LostFoundBoard,
  },
  {
    id: "eventNotices",
    label: "Event Notices",
    component: EventNotices,
  },
  {
    id: "notificationDeliveryLog",
    label: "Notification Delivery Log",
    component: NotificationDeliveryLog,
  },
];