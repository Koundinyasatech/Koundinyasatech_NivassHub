const columns = (handleOpenModal) => [
  {
    key: "passId",
    title: "PASS ID",
  },
  {
    key: "unit",
    title: "UNIT",
  },
  {
    key: "visitor",
    title: "VISITOR",
  },
  {
    key: "purpose",
    title: "PURPOSE",
    render: (row) => (
      <span className="purpose-badge">
         {row.purpose}
      </span>
    ),
  },
  {
    key: "validUntil",
    title: "VALID UNTIL",
  },
  {
    key: "status",
    title: "STATUS",
    render: (row) => (
      <span
        className={`status-badge ${row.status.toLowerCase()}`}
      >
         {row.status}
      </span>
    ),
  },
  {
    key: "action",
    title: "",
    render: (row) => (
      <button
        className="action-btn"
        onClick={() => handleOpenModal(row)}
      >
        {row.action}
      </button>
    ),
  },
];

export default columns;