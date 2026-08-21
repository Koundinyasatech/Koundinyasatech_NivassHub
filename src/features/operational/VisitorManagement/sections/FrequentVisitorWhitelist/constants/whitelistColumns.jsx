const columns = [
  {
    key: "name",
    title: "NAME",
  },
  {
    key: "category",
    title: "CATEGORY",
    render: (row) => (
      <span className="purpose-badge">
         {row.category}
      </span>
    ),
  },
  {
    key: "phone",
    title: "PHONE",
  },
  {
    key: "gates",
    title: "GATES",
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
    key: "edit",
    title: "",
    render: () => (
      <button className="link-btn">
        Edit
      </button>
    ),
  },
  {
    key: "action",
    title: "",
    render: (row) => (
      <button className="link-btn">
        {row.action}
      </button>
    ),
  },
];

export default columns;