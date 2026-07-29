const accessAnomalyData = [
  {
    id: "AN-410",
    type: "Repeated failed OTP",
    detail: "Unit B-205 – 4 failed attempts",
    detected: "2026-07-09 07:38",
    status: "Open",
    action: "Review",
  },
  {
    id: "AN-407",
    type: "Off-hours entry",
    detail: "Staff RFID used 02:14 at Rear Gate",
    detected: "2026-07-08 02:14",
    status: "Open",
    action: "Review",
  },
  {
    id: "AN-401",
    type: "Unrecognised plate",
    detail: "AP 28 ZZ 0099 at Rear Gate, no match",
    detected: "2026-07-09 09:22",
    status: "Open",
    action: "Review",
  },
  {
    id: "AN-390",
    type: "Off-hours entry",
    detail: "Guest QR used 23:50 at Main Gate",
    detected: "2026-07-05 23:50",
    status: "Reviewed",
    action: "View",
  },
];

export default accessAnomalyData;