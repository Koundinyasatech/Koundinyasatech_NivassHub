import Table from "../../../../../../components/Common/Table/Table";

function CommitteeElectionTable({
  data = [],
  onView,
  onApprove,
  onReject,
}) {
  const columns = [
    {
      key: "candidate",
      title: "CANDIDATE",
      render: (item) => (
        <strong>{item.candidate}</strong>
      ),
    },
    {
      key: "unit",
      title: "UNIT",
    },
    {
      key: "position",
      title: "POSITION CONTESTING FOR",
    },
    {
      key: "nominated",
      title: "NOMINATED",
    },
    {
      key: "status",
      title: "STATUS",
      render: (item) => (
        <span
          className={`status-badge ${
            item.status?.toLowerCase().replace(/\s+/g, "-")
          }`}
        >
          <span className="status-dot">•</span>
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      title: "ACTIONS",
      render: (item) =>
        item.status === "Pending" ? (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onApprove?.(item)}
            >
              Approve
            </button>

            <button
              type="button"
              className="table-action"
              onClick={() => onReject?.(item)}
            >
              Reject
            </button>
          </>
        ) : (
          <button
            type="button"
            className="table-action"
            onClick={() => onView?.(item)}
          >
            View
          </button>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      emptyMessage="No nominations found."
    />
  );
}

export default CommitteeElectionTable;