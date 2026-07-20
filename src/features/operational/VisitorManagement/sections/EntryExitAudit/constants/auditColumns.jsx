const columns = [
  {
    key: "visitor",
    title: "VISITOR",
  },
  {
    key: "flat",
    title: "FLAT VISITED",
  },
  {
    key: "gate",
    title: "GATE",
  },
  {
    key: "entryTime",
    title: "ENTRY TIME",
    render: (row) => (
      <span style={{ whiteSpace: "pre-line" }}>
        {row.entryTime}
      </span>
    ),
  },
  {
    key: "exitTime",
    title: "EXIT TIME",
    render: (row) => (
      <span style={{ whiteSpace: "pre-line" }}>
        {row.exitTime}
      </span>
    ),
  },
  {
    key: "method",
    title: "ENTRY METHOD",
    render: (row) => (
      <span className="status-badge">
         {row.method}
      </span>
    ),
  },
  {
    key: "guard",
    title: "GUARD ON DUTY",
  },
];

export default columns;