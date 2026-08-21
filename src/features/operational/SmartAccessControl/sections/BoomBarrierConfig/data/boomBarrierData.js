const boomBarrierData = [
  {
    id: 1,
    barrier: "Main Gate — Entry",
    gate: "Main Gate",
    trigger: "RFID + QR",
    deviceId: "BB-MG-01",
    connection: "Online",
    action: "Edit",
    test: "Test connection",
  },
  {
    id: 2,
    barrier: "Main Gate — Exit",
    gate: "Main Gate",
    trigger: "RFID",
    deviceId: "BB-MG-02",
    connection: "Online",
    action: "Edit",
    test: "Test connection",
  },
  {
    id: 3,
    barrier: "Rear Gate — Entry/Exit",
    gate: "Rear Gate",
    trigger: "RFID",
    deviceId: "BB-RG-01",
    connection: "Offline",
    action: "Edit",
    test: "Test connection",
  },
];

export default boomBarrierData;